import { verifyJwt } from "../services/auth.jwt.js";

async function handleProtectedWithLogin(request, response, handlerFunc) {
	try {
		const sessionData = await verifyJwt({ token: request.cookies.session });
		await handlerFunc(request, response, sessionData);
	} catch (error) {
		console.error(error);
		return response.code(401).send({ message: "unauthorized" });
	}
}

export default handleProtectedWithLogin;
