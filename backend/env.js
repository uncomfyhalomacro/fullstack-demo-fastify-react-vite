import { loadEnvFile } from "node:process";

if (process.env.PROD !== "prod") {
	loadEnvFile();
}

export const DOMAIN = process.env.DOMAIN || undefined;
export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
export const HOST = process.env.HOST || "localhost";
export const PROD = process.env.PROD || "prod";
export const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";
export const PORT = process.env.PORT || 3000;
export const PG_DB = process.env.PG_DB || "db";
export const PG_USER = process.env.PG_USER || "";
export const PG_PASSWORD = process.env.PG_PASSWORD || "";
export const PG_HOST = process.env.PG_HOST || "localhost";
export const SECRET = process.env.JWT_SECRET || "secret";
export const ISSUER = process.env.JWT_ISSUER || "";
export const AUD = process.env.JWT_AUD || "";
