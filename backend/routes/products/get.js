import { verifyJwt } from "../../services/auth/jwt.js";
import { getProductsByUserId } from "../../services/product/core.js";

const handlerGetProductsByUserID = async (req, res) => {
	const { id: user_id } = await verifyJwt({ token: req.cookies.session });
	const data = await getProductsByUserId({ user_id });
	if (data === undefined || data === null) {
		return res.send([]);
	}
	return res.send(data);
};

const handlerGetProductsByUserIDFromPath = async (req, res) => {
	const { user_id } = req.params;
	const data = await getProductsByUserId({ user_id });
	if (data === undefined || data === null) {
		return res.send([]);
	}
	return res.send(data);
};
export { handlerGetProductsByUserID, handlerGetProductsByUserIDFromPath };
