import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// ──────────────────────────────────────────────────────────────
// Prisma v7 configuration
//
// DIRECT_URL    → Supabase Session Pooler (port 5432)
//                 Dipakai oleh Prisma Migrate untuk DDL commands.
//                 Note: Supabase memblokir koneksi direct ke port 5432
//                 dari luar — gunakan Session Pooler sebagai pengganti.
//
// DATABASE_URL  → Supabase Transaction Pooler (port 6543)
//                 Dipakai oleh Prisma Client runtime di Vercel serverless.
// ──────────────────────────────────────────────────────────────
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DIRECT_URL"),
  },
});
