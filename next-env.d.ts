/// <reference types="next" />
/// <reference types="next/image-types/global" />

declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    NEXTAUTH_URL: string;
    NEXTAUTH_SECRET: string;
    INTERNAL_CRON_SECRET: string;
    SEED_ADMIN_EMAIL?: string;
    SEED_ADMIN_PASSWORD?: string;
  }
}