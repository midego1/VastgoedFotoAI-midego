"use client";

import { IconLoader, IconMail, IconRefresh } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl"; // Added import from next-intl
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";

interface VerifyEmailFormProps {
  email: string;
  isNewSignup?: boolean;
}

export function VerifyEmailForm({ email, isNewSignup }: VerifyEmailFormProps) {
  const router = useRouter();
  const [isResending, setIsResending] = useState(false);
  const t = useTranslations("auth.verifyEmail"); // Hook for translations

  const handleResendVerification = async () => {
    setIsResending(true);

    try {
      await authClient.sendVerificationEmail({
        email,
        callbackURL: "/dashboard",
      });
      toast.success("Verification email sent! Check your inbox.");
    } catch {
      toast.error("Failed to send verification email. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    router.push("/sign-in");
  };

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="text-center">
        {isNewSignup && (
          <>
            <div className="mb-6 flex justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Success Celebration"
                className="max-h-96 rounded-lg shadow-md"
                src="/success.gif"
              />
            </div>
            <CardTitle className="mb-2 text-2xl">
              {t("congratulations")}
            </CardTitle>
            <p className="mb-6 font-medium text-foreground">
              {t("successMessage")}
            </p>
          </>
        )}

        {!isNewSignup && (
          <>
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <IconMail className="h-7 w-7 text-primary" />
            </div>
            <CardTitle className="text-2xl">{t("title")}</CardTitle>
          </>
        )}

        <CardDescription>
          {t("subtitle")}{" "}
          <span className="font-medium text-foreground">{email}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-center text-muted-foreground text-sm">
          {t("checkSpam")}
        </p>

        <Button
          className="w-full"
          disabled={isResending}
          onClick={handleResendVerification}
          variant="outline"
        >
          {isResending ? (
            <>
              <IconLoader className="mr-2 size-4 animate-spin" />
              {t("sending")}
            </>
          ) : (
            <>
              <IconRefresh className="mr-2 size-4" />
              {t("resend")}
            </>
          )}
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        <button
          className="text-muted-foreground text-sm underline underline-offset-4 hover:text-foreground"
          onClick={handleSignOut}
          type="button"
        >
          {t("signOutAndUseDifferentEmail")}
        </button>
      </CardFooter>
    </Card>
  );
}
