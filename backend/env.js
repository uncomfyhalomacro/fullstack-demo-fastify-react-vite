import { loadEnvFile } from "node:process";

loadEnvFile();

export const PROD = process.env.PROD || "prod";
export const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";
export const PORT = process.env.PORT || 3000;
export const PG_DB = process.env.PG_DB || "db";
export const PG_USER = process.env.PG_USER || "";
export const PG_PASSWORD = process.env.PG_PASSWORD || "";
