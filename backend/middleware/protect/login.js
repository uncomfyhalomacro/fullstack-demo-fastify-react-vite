import { roleCheck } from "../../access-controls/users.roles.js";
import { verifyJwt } from "../../services/auth/jwt.js";

async function handleProtectedWithLogin(request, response, handlerFunc) {
	try {
		const sessionData = await verifyJwt({ token: request.cookies.session });
		await handlerFunc(request, response, sessionData);
		return;
	} catch (error) {
		console.error(error);
		return response.code(401).send({ message: "unauthorized" });
	}
}

async function handleProtectedWithLoginWithRoleCheck(
	request,
	response,
	targetRole,
	handlerFunc,
) {
	const sessionData = await verifyJwt({ token: request.cookies.session });
	const role = sessionData.role ?? "unknown";
	try {
		roleCheck(role);
		// Use role afterwards
		if (role === targetRole) {
			if (targetRole === "seller") {
				if (sessionData.id !== request.params.user_id) {
					response.code(301);
					return response.send({
						message: "you are not allowed to operate on this product",
					});
				}
				await handlerFunc(request, response);
			}
			if (targetRole === "admin") await handlerFunc(request, response);
			return;
		}
		response.code(301);
		return response.send({
			message: "you are not allowed to operate on this product",
		});
	} catch (error) {
		console.error(error);
		response.code(301);
		return response.send({ message: error.message });
	}
}

export { handleProtectedWithLogin, handleProtectedWithLoginWithRoleCheck };
