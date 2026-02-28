import { loadEnvFile } from "node:process";

loadEnvFile()

export const PROD = process.env.PROD || "prod";

