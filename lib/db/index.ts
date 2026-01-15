import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Supabase Transaction mode (port 6543) requires prepare: false
const client = postgres(process.env.DATABASE_URL!, { 
  prepare: false,
  ssl: { rejectUnauthorized: false },
  max: 1, // Limit connections per serverless instance to avoid exhausting pool
});

export const db = drizzle(client, { schema });
