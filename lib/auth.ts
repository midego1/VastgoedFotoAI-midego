import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "./db";
import { account, session, user, verification, workspace } from "./db/schema";
import { sendPasswordResetEmail, sendVerificationEmail } from "./email";

// Schema object for drizzle adapter
const schema = { user, session, account, verification, workspace };

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    requireEmailVerification: true,
    sendResetPassword: async ({ user: resetUser, url }) => {
      // Don't await to prevent timing attacks
      void sendPasswordResetEmail(resetUser.email, resetUser.name, url);
    },
    resetPasswordTokenExpiresIn: 60 * 60, // 1 hour
  },
  emailVerification: {
    sendVerificationEmail: async ({ user: verifyUser, url }) => {
      await sendVerificationEmail(verifyUser.email, verifyUser.name, url);
    },
    sendOnSignUp: true,
    sendOnSignIn: true, // Resend verification on unverified sign-in attempts
    autoSignInAfterVerification: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (refresh session if older than this)
  },
  plugins: [
    admin({
      impersonationSessionDuration: 60 * 60 * 24, // 1 day
    }),
  ],
  databaseHooks: {
    user: {
      create: {
        after: async (createdUser) => {
          // Create workspace automatically when user signs up
          const slug = createdUser.email
            .split("@")[0]
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-");
          const workspaceId = nanoid();

          await db.insert(workspace).values({
            id: workspaceId,
            name: `${createdUser.name}'s Workspace`,
            slug: `${slug}-${workspaceId.slice(0, 6)}`,
          });

          // Update user with workspaceId and set as owner
          await db
            .update(user)
            .set({ workspaceId, role: "owner" })
            .where(eq(user.id, createdUser.id));
        },
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
