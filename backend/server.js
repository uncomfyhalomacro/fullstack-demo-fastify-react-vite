import fastifyCookie from "@fastify/cookie";
import cors from "@fastify/cors";
import Fastify from "fastify";
import { loadEnvFile } from "node:process";
import {
	handleProtectedWithLogin,
	handleProtectedWithLoginWithRoleCheck,
} from "./middleware/protect/login.js";
import { handlerUserLogin } from "./routes/auth/login.js";
import { handlerUserRegister } from "./routes/auth/register.js";
import { handlerUserUpdate } from "./routes/auth/update.js";
import { handlerAddProduct } from "./routes/products/add.js";
import {
	handlerGetProductsByUserID,
	handlerGetProductsByUserIDFromPath,
} from "./routes/products/get.js";
import { handlerIncrementDecrement } from "./routes/products/increment-decrement.js";
import { handlerRemoveProduct } from "./routes/products/remove.js";
import { handlerUpdateProductInfo } from "./routes/products/update.js";
import { verifyJwt } from "./services/auth/jwt.js";
import { PROD } from "./env.js";

loadEnvFile();

const PORT = process.env.PORT || 3000;
const COOKIE_SECRET = process.env.COOKIE_SECRET || "cookie-secret";
const fastify = Fastify({
	logger: true,
});

fastify.register(fastifyCookie, {
	secret: COOKIE_SECRET,
});
await fastify.register(import("@fastify/swagger"), {
	openapi: {
		openapi: "3.0.0",
		info: {
			title: "Test swagger",
			description: "Testing the Fastify swagger API",
			version: "0.1.0",
		},
		components: {
			securitySchemes: {
				cookieAuth: {
					in: "cookie",
					type: "apiKey",
					name: "session",
				},
			},
		},
		security: [
			{
				cookieAuth: [],
			},
		],
	},
});
await fastify.register(import("@fastify/swagger-ui"), {
	routePrefix: "/documentation",
	uiConfig: {
		docExpansion: "full",
		deepLinking: false,
	},
	uiHooks: {
		onRequest: (request, reply, next) => {
			next();
		},
		preHandler: (request, reply, next) => {
			next();
		},
	},
	staticCSP: true,
	transformStaticCSP: (header) => header,
	transformSpecification: (swaggerObject, request, reply) => {
		return swaggerObject;
	},
	transformSpecificationClone: true,
});

fastify.register(cors, {
	strictPreflight: true,
	origin:
		PROD === "dev" ? ["http://localhost:8080", "http://localhost:5173"] : [], // TODO: add an env
	methods: ["GET", "HEAD", "POST", "DELETE", "PUT", "PATCH"],
	allowedHeaders: ["Content-Type", "Authorization"],
	credentials: true,
});

fastify.get("/healthz", async (_, resp) => {
	return resp.code(200).send("OK");
});

fastify.post(
	"/:role/products/:user_id",
	{
		schema: {
			body: {
				type: "object",
				properties: {
					name: { type: "string" },
					in_price: { type: "number" },
					price: { type: "number" },
					description: { type: "string" },
					type: { type: "string" },
					unit: { type: "string" },
				},
			},
		},
	},
	async (req, resp) => {
		const { role } = req.params;
		await handleProtectedWithLoginWithRoleCheck(
			req,
			resp,
			role ?? "unknown",
			handlerAddProduct,
		);
	},
);

fastify.put(
	"/:role/products/:user_id/:id/:inc_dec_opt/:rawValue",
	async (req, resp) => {
		const { role } = req.params;
		await handleProtectedWithLoginWithRoleCheck(
			req,
			resp,
			role ?? "unknown",
			handlerIncrementDecrement,
		);
	},
);

fastify.patch("/:role/products/:user_id/:id", async (req, resp) => {
	const { role } = req.params;
	await handleProtectedWithLoginWithRoleCheck(
		req,
		resp,
		role ?? "unknown",
		handlerUpdateProductInfo,
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

fastify.get("/:role/products", async (req, resp) => {
	const { role } = req.params;
	await handleProtectedWithLoginWithRoleCheck(
		req,
		resp,
		role ?? "unknown",
		handlerGetProductsByUserID,
	);
});

fastify.get("/:role/products/:user_id", async (req, resp) => {
	const { role } = req.params;
	await handleProtectedWithLoginWithRoleCheck(
		req,
		resp,
		role ?? "unknown",
		handlerGetProductsByUserIDFromPath,
	);
});
fastify.post(
	"/auth/user/register",
	{
		schema: {
			body: {
				type: "object",
				properties: {
					username: { type: "string" },
					password: { type: "string" },
					email: { type: "string" },
					contact_number: { type: "string" },
				},
			},
		},
	},
	handlerUserRegister,
);
fastify.post(
	"/auth/user/login",
	{
		schema: {
			security: [],
			response: {
				200: {
					description: "Successful Login",
					headers: {
						"Set-Cookie": {
							type: "string",
							description: "Authentication cookie",
						},
					},
					type: "object",
					properties: {
						username: { type: "string" },
						email: { type: "string" },
						role: { type: "string" },
					},
				},
			},
			body: {
				type: "object",
				properties: {
					username: { type: "string" },
					password: { type: "string" },
				},
			},
		},
	},
	handlerUserLogin,
);
fastify.put(
	"/auth/user/update",
	{
		schema: {
			description:
				"Updates user information. Updating either username and password will require a relogin since the authentication cookie is invalidated",
			// cookies: {
			// 	type: "string",
			// 	properties: {
			// 		session: { type: "string" },
			// 	},
			// },
			security: [{ cookieAuth: [] }],
			body: {
				type: "object",
				properties: {
					newUsername: { type: "string" },
					newPassword: { type: "string" },
					newContactNumber: { type: "string" },
					newEmail: { type: "string" },
				},
			},
		},
	},
	async (req, resp) => {
		await handleProtectedWithLogin(req, resp, handlerUserUpdate);
		return;
	},
);

fastify.get("/auth/user/profile", async (request, reply) => {
	try {
		const decoded = await verifyJwt({
			token: request.cookies.session,
		});
		return reply.send({
			username: decoded.username,
			email: decoded.email,
			role: decoded.role,
		});
	} catch (err) {
		console.error(err);
		return reply.status(401).send({ message: "unauthorized" }); // Token is invalid
	}
});

try {
	await fastify.listen({ port: PORT });
	await fastify.ready();
	fastify.swagger();
} catch (err) {
	fastify.log.error(err);
	process.exit(1);
}
