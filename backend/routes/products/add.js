import { addProductByUserId } from "../../services/product/core.js";

const handlerAddProduct = async (req, resp) => {
	const { user_id } = req.params;
	const { name, in_price, price, type, description, unit } = req.body;
	try {
		await addProductByUserId({
    			user_id,
			name,
			in_price,
			price,
			type,
			description,
			unit,
		});
		resp.code(200);
		return resp.send({ message: `successfully added new ${type} ${name}` });
	} catch (error) {
		console.error(error);
		resp.code(501);
		return resp.send({ message: error.message });
	}
};

export { handlerAddProduct };
