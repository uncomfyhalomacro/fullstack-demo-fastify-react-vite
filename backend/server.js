import fastifyCookie from "@fastify/cookie";
import Fastify from "fastify";
import { loadEnvFile } from "node:process";
import { loginHandler } from "./routes/auth.login.js";
import { registerHandler } from "./routes/auth.register.js";
import { verifyJwt } from "./services/auth.jwt.js";

loadEnvFile();
const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";
const fastify = Fastify({
	logger: true,
});
fastify.register(fastifyCookie, {
	secret: COOKIE_SECRET,
});

fastify.get("/", async function handler(request, response) {
	// Testing only if the login works. We run `curl -b cookie.jar http://localhost:$PORT/` to test
	const data = await verifyJwt({ token: request.cookies.session });
	return data;
});

fastify.post("/register", registerHandler);
fastify.post("/login", loginHandler);

try {
	await fastify.listen({ port: PORT });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
