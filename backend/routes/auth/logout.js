import { login } from "../../services/auth/core.js";

const handlerUserLogout = async (req, res) => {
	try {
		return res
			.clearCookie("session", {
				path: "/",
				secure: true,
				httpOnly: true,
				sameSite: "none",
			})
			.code(200)
			.send("Logged out");
	} catch (error) {
		console.error(error);
		return res.code(500).send({ message: error.message });
	}
};

export { handlerUserLogout };
