import isSafeNumber from "../../helpers/isSafeNumber.js";
import ProductModel from "../../models/ProductModel.js";

const addProductByUserId = async ({ name, price, type, user_id }) => {
	if (!name || name.trim() === "") {
		throw new Error("name is missing");
	}
	if (!price) {
		throw new Error("price is missing");
	}
	const cprice = Number(price);
	if (!cprice === 0) {
		throw new Error("price cannot be zero");
	}
	if (!type || type.trim() === "") {
		throw new Error("type is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!isSafeNumber(cprice) || !Number.isSafeInteger(cprice))
		throw new Error("price number has exceeded safe limits");
	await ProductModel.create({
		name,
		price: cprice,
		type,
		user_id,
	});
};

const incrementProductByIdAndUserId = async ({ id, user_id, count }) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!count) {
		throw new Error("count is missing");
	}
	if (count < 1) {
		throw new Error("count should be greater than 1");
	}
	const product = await ProductModel.findOne({
		where: {
			id: id,
			user_id: user_id,
		},
	});
	if (!product) {
		throw new Error("product does not exist");
	}
	const initialProductCount = BigInt(product.count);
	const toAdd = BigInt(count);
	const initialTotal = BigInt(product.count) + BigInt(count);
	const everyValue = [initialProductCount, toAdd, initialTotal];
	if (!everyValue.every(isSafeNumber) || !Number.isSafeInteger(count))
		throw new Error("number has exceeded safe limits");
	if (initialTotal < 0) {
		throw new Error(
			`product count should not be negative. aborting increment operation.`,
		);
	}
	await product.increment("count", { by: BigInt(count) });
};

const decrementProductByIdAndUserId = async ({ id, user_id, count }) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!count) {
		throw new Error("count is missing");
	}
	if (count < 1) {
		throw new Error("count should be greater than 1");
	}
	const product = await ProductModel.findOne({
		where: {
			id: id,
			user_id: user_id,
		},
	});
	if (!product) {
		throw new Error("product does not exist");
	}
	const initialProductCount = BigInt(product.count);
	const toSubtract = BigInt(count);
	const initialTotal = BigInt(product.count) - BigInt(count);
	const everyValue = [initialProductCount, toSubtract, initialTotal];
	if (!everyValue.every(isSafeNumber) || !Number.isSafeInteger(count))
		throw new Error("number has exceeded safe limits");
	if (initialTotal < 0) {
		throw new Error(
			`product count should not be negative. aborting decrement operation.`,
		);
	}
	await product.decrement("count", { by: BigInt(count) });
};

const removeProductByIdAndUserId = async ({ id, user_id }) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	const product = await ProductModel.findOne({
		where: {
			id: id,
			user_id: user_id,
		},
	});
	if (!product) {
		throw new Error("product does not exist");
	}
	await product.destroy({
		where: {
			id: id,
			user_id: user_id,
		},
	});
};

const updateProductPriceByIdAndUserId = async ({ id, user_id, price }) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!price) {
		throw new Error("price is missing");
	}
	const cprice = Number(price);
	if (!cprice === 0) {
		throw new Error("price cannot be zero");
	}
	if (!isSafeNumber(cprice) || !Number.isSafeInteger(cprice))
		throw new Error("price number has exceeded safe limits");
	const product = await ProductModel.findOne({
		where: {
			id: id,
			user_id: user_id,
		},
	});
	if (!product) {
		throw new Error("product does not exist");
	}
	await product.update({
		price: cprice,
	});
};

const updateProductNameByIdAndUserId = async ({ id, user_id, name }) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!name || name.trim() === "") {
		throw new Error("name is missing");
	}
	const product = await ProductModel.findOne({
		where: {
			id: id,
			user_id: user_id,
		},
	});
	if (!product) {
		throw new Error("product does not exist");
	}
	await product.update({
		name: name,
	});
};

export {
	addProductByUserId,
	decrementProductByIdAndUserId,
	incrementProductByIdAndUserId,
	removeProductByIdAndUserId,
	updateProductNameByIdAndUserId,
	updateProductPriceByIdAndUserId,
};
