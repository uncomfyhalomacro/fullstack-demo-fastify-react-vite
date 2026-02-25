import { update } from "../services/auth.services.js";

const updateHandler = async (req, res, sessionData) => {
	const { newUsername, newPassword } = req.body;
	try {
		const { id, username } = sessionData;
		const { hasReplacedPassword, hasReplacedUsername } = await update(
			id,
			username,
			{ newUsername, newPassword },
		);

		if (!hasReplacedPassword && !hasReplacedUsername) {
			res.code(200).send({ message: "no username and password changed" });
			return res.clearCookie("session", { path: "/" });
		}
		if (hasReplacedPassword) {
			res.clearCookie("session");
			return res.code(200).send({ message: "password changed" });
		}
		if (hasReplacedUsername) {
			res.clearCookie("session");
			return res.code(200).send({ message: "username changed" });
		}
	} catch (error) {
		console.error(error);
		return res.code(500).send({ message: error.message });
	}
};

export { updateHandler };
