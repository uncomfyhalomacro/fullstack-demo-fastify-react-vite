import { generateJwt } from "../services/auth.jwt.js";
import { login } from "../services/auth.services.js";

const loginHandler = async (req, res) => {
	const { username, password } = req.body;
	try {
		const { verified, role, id, email } = await login(username, password);
		if (verified) {
			// do something here
			const jwtToken = await generateJwt({
				user_id: id,
				role,
				email,
			});
			res.setCookie("session", jwtToken, { secure: true });
			return res.code(200).send({
				message: "User has logged in",
			});
		} else {
			return res.code(401).send({ message: "Unauthorized" });
		}
	} catch (error) {
		console.log(error);
		return res.code(500).send({ message: error.message });
	}
};

export { loginHandler };
