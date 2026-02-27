import { login } from "../../services/auth/core.js";
import { generateJwt } from "../../services/auth/jwt.js";

const handlerUserLogin = async (req, res) => {
	const { username, password } = req.body;
	try {
		const { verified, role, id, email } = await login(username, password);
		if (verified) {
			const jwtToken = await generateJwt({
				user_id: id,
				role,
				email,
				username,
			});
			res.setCookie("session", jwtToken, { secure: true });
			return res.code(200).send({
				email,
				username,
				role,
			});
		} else {
			return res.code(401).send({ message: "Unauthorized" });
		}
	} catch (error) {
		console.error(error);
		return res.code(500).send({ message: error.message });
	}
};

export { handlerUserLogin };
