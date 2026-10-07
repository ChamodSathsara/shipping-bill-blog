import "server-only";

import { neon } from "@neondatabase/serverless";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL is not configured. Add the Neon connection string to .env.local.",
  );
}

/** Shared Neon client for server-side code only. */
export const sql = neon(databaseUrl);
