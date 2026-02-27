import ProductModel from "../../models/ProductModel.js";

const handlerUpdateProductInfo = async (req, resp) => {
	const { name, price, type } = req.body;
	const { id, user_id } = req.params;

	const updates = {};

	if (name !== undefined) {
		if (!name.trim()) {
			return resp.code(400).send({
				message: "name cannot be empty",
			});
		}
		updates.name = name.trim();
	}

	if (type !== undefined) {
		if (!type.trim()) {
			return resp.code(400).send({
				message: "type cannot be empty",
			});
		}
		updates.type = type.trim();
	}

	if (price !== undefined) {
		const cprice = Number(price);

		if (!Number.isFinite(cprice)) {
			return resp.code(400).send({
				message: "price must be a number",
			});
		}

		if (!Number.isSafeInteger(cprice) || cprice <= 0) {
			return resp.code(400).send({ message: "invalid price value" });
		}

		updates.price = cprice;
	}

	if (Object.keys(updates).length === 0) {
		return resp.code(400).send({ message: "nothing to update" });
	}

	const [updatedRows] = await ProductModel.update(updates, {
		where: { id, user_id },
	});

	if (updatedRows === 0) {
		return resp.code(404).send({
			message: "product does not exist",
		});
	}

	return resp.send({
		message: `successfully updated product with id ${id}`,
	});
};

export { handlerUpdateProductInfo };
