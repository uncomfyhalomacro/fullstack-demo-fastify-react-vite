import {
	decrementProductByIdAndUserId,
	incrementProductByIdAndUserId,
} from "../../services/product/core.js";

const handlerIncrementDecrement = async (req, resp) => {
	const { id, user_id, inc_dec_opt, rawValue } = req.params;
	const count = Number(rawValue);
	if (Number.isNaN(count)) {
		resp.code(402);
		return resp.send({ message: "value is not a number" });
	}
	try {
		switch (inc_dec_opt) {
			case "inc":
				await incrementProductByIdAndUserId({
					id,
					user_id,
					count,
				});
				return resp.send({ message: `successfully incremented by ${count}` });
			case "dec":
				await decrementProductByIdAndUserId({
					id,
					user_id,
					count,
				});
				return resp.send({ message: `successfully decremented by ${count}` });
			default:
				resp.code(400);
				return resp.send({ message: `unknown operation ${inc_dec_opt}` });
		}
	} catch (error) {
		console.error(error);
		resp.code(501);
		return resp.send({ message: error.message });
	}
};

export { handlerIncrementDecrement };
