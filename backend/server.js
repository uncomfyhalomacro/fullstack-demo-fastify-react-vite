import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { loadEnvFile } from "node:process";
import handleProtectedWithLogin from "./middleware/protect/login.js";
import { loginHandler } from "./routes/auth/login.js";
import { registerHandler } from "./routes/auth/register.js";
import { updateHandler } from "./routes/auth/update.js";

loadEnvFile();

const PORT = process.env.PORT || 3000;
const PROD = process.env.PROD || "prod";
const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";
const fastify = Fastify({
	logger: true,
});

fastify.register(fastifyCookie, {
	secret: COOKIE_SECRET,
});

fastify.register(cors, {
	strictPreflight: true,
	origin: PROD === "dev" ? "http://localhost:8080" : "",
	methods: ["GET", "HEAD", "POST", "DELETE", "PUT"],
	allowedHeaders: ["Content-Type", "Authorization"]
});

fastify.get("/healthz", async (_, resp) => {
    return resp.code(200).send("OK")
})

fastify.post("/auth/register", registerHandler);
fastify.post("/auth/login", loginHandler);
fastify.put("/auth/update", async (req, resp) => {
	await handleProtectedWithLogin(req, resp, updateHandler);
});

try {
	await fastify.listen({ port: PORT });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
