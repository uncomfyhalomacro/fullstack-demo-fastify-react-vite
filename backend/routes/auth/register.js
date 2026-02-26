import { register } from "../../services/auth/core.js";

const registerHandler = async (req, res) => {
	const { username, password, email, contact_number } = req.body;
	try {
		await register(username, password, email, contact_number);
	} catch (error) {
		console.error(error);
		return res.code(500).send({ message: error.message });
	}
	return res.code(200).send({ message: "User Created", ok: true });
};

export { registerHandler };
