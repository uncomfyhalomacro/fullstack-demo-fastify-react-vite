import { insertUnitSystem } from "../../helpers/insertUnitSystem.js";
import ProductModel from "../../models/ProductModel.js";

const handlerUpdateProductInfo = async (req, resp) => {
	const { name, in_price, price, type, description, unit } = req.body;
	const { id, user_id } = req.params;

	const product = await ProductModel.findOne({ where: { id, user_id } });

	if (!product) {
		return resp.code(404).send({ message: "Product not found" });
	}

	if (description !== undefined) product.description = description;
	if (unit !== undefined) product.unit = unit;
	insertUnitSystem(product); // NOTE: we have to do this because Sequelize `.update` method does not execute hooks

	if (name !== undefined) {
		if (!name.trim()) {
			return resp.code(400).send({ message: "name cannot be empty" });
		}
		product.name = name.trim();
	}

	if (type !== undefined) {
		if (!type.trim()) {
			return resp.code(400).send({ message: "type cannot be empty" });
		}
		product.type = type.trim();
	}

	if (price !== undefined) {
		const cprice = Number(price);
		if (
			!Number.isFinite(cprice) ||
			!Number.isSafeInteger(cprice) ||
			cprice <= 0
		) {
			return resp.code(400).send({ message: "invalid price value" });
		}
		product.price = cprice;
	}

	if (in_price !== undefined) {
		const cin_price = Number(in_price);
		if (
			!Number.isFinite(cin_price) ||
			!Number.isSafeInteger(cin_price) ||
			cin_price <= 0
		) {
			return resp.code(400).send({ message: "invalid in_price value" });
		}
		product.in_price = cin_price;
	}

	product.updatedAt = new Date();

	await product.save();

	return resp.send({
		message: `successfully updated product with id ${id}`,
	});
};

export { handlerUpdateProductInfo };
