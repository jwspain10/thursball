import { z } from "zod";

const envSchema = z.object({
  // Database
  PRISMA_DATABASE_URL: z.string().min(1, "PRISMA_DATABASE_URL is required"),

  // Auth
  AUTH_SECRET: z.string().min(1, "AUTH_SECRET is required"),
  AUTH_GITHUB_ID: z.string().min(1, "AUTH_GITHUB_ID is required"),
  AUTH_GITHUB_SECRET: z.string().min(1, "AUTH_GITHUB_SECRET is required"),

  // GitHub Models (AI inference)
  GITHUB_TOKEN: z.string().min(1, "GITHUB_TOKEN is required"),

  // Runtime
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues
    .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(
    `\n\nMissing or invalid environment variables:\n${missing}\n\nCheck .env.example for the required variables.\n`,
  );
}

export const env = parsed.data;
