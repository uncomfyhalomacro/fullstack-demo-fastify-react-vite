import { update } from "../../services/auth/core.js";

const handlerUserUpdate = async (req, res, sessionData) => {
	const { newUsername, newPassword, newContactNumber, newEmail } = req.body;
	try {
		const { id, username } = sessionData;
		const {
			hasReplacedPassword,
			hasReplacedUsername,
			hasReplacedContactNumber,
			hasReplacedEmail,
		} = await update(id, username, {
			newUsername,
			newPassword,
			newContactNumber,
			newEmail,
		});
		if (hasReplacedPassword || hasReplacedUsername) {
			res.clearCookie("session", { path: "/" });
		}
		return res.send({
			hasReplacedPassword,
			hasReplacedUsername,
			hasReplacedContactNumber,
			hasReplacedEmail,
		});
	} catch (error) {
		console.error(error);
		return res.code(500).send({ message: error.message });
	}
};

export { handlerUserUpdate };
