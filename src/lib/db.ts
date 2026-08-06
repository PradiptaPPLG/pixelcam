import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// ──────────────────────────────────────────────────────────────
// Prisma v7 requires a driver adapter. We use PrismaPg with
// a connection pool from the `pg` library.
//
// Global singleton pattern prevents too many connections
// being opened during hot-reloading in Next.js development.
// In production (Vercel), each serverless invocation gets a
// fresh module scope, so the global cache ensures one pool
// per function instance.
// ──────────────────────────────────────────────────────────────

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });
  const adapter = new PrismaPg(pool);
  return new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
