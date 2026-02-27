import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { loadEnvFile } from "node:process";
import {
	handleProtectedWithLogin,
	handleProtectedWithLoginWithRoleCheck,
} from "./middleware/protect/login.js";
import { handlerAddProduct } from "./routes/products/add.js";
import { handlerRemoveProduct } from "./routes/products/remove.js";
import { handlerUserLogin } from "./routes/auth/login.js";
import { handlerUserRegister } from "./routes/auth/register.js";
import { handlerUserUpdate } from "./routes/auth/update.js";

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
	allowedHeaders: ["Content-Type", "Authorization"],
});

fastify.get("/healthz", async (_, resp) => {
	return resp.code(200).send("OK");
});

fastify.post("/:role/products/:user_id", async (req, resp) => {
	const { role } = req.params;
	await handleProtectedWithLoginWithRoleCheck(
		req,
		resp,
		role ?? "unknown",
		handlerAddProduct,
	);
});

fastify.delete("/:role/products/:user_id/:id", async (req, resp) => {
	const { role } = req.params;
	await handleProtectedWithLoginWithRoleCheck(
		req,
		resp,
		role ?? "unknown",
		handlerRemoveProduct,
	);
});

fastify.post("/auth/user/register", handlerUserRegister);
fastify.post("/auth/user/login", handlerUserLogin);
fastify.put("/auth/user/update", async (req, resp) => {
	await handleProtectedWithLogin(req, resp, handlerUserUpdate);
	return;
});

try {
	await fastify.listen({ port: PORT });
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
