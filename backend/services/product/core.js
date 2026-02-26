import ProductModel from "../database/ProductModel.js";

const addProduct = async ({ name, price, type, user_id }) => {
	if (!name || name.trim() === "") {
		throw new Error("name is missing");
	}
	if (!price) {
		throw new Error("price is missing");
	}
	if (!price === 0) {
		throw new Error("price cannot be zero");
	}
	if (!type || type.trim() === "") {
		throw new Error("type is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	await ProductModel.create({
		name,
		price,
		type,
		user_id,
	});
};

const incrementProductByIdAndUserId = async (id, user_id, count) => {
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
	await product.increment("count", { by: count });
};

const decrementProductByIdAndUserId = async (id, user_id, count) => {
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
	await product.decrement("count", { by: count });
};

const removeProductByIdAndUserId = async (id, user_id) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	await ProductModel.destroy({
		where: {
			id: id,
			user_id: user_id,
		},
	});
};

const updateProductPriceByIdAndUserId = async (id, user_id, price) => {
	if (!id || id.trim() === "") {
		throw new Error("id is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	if (!price) {
		throw new Error("price is missing");
	}
	if (!price === 0) {
		throw new Error("price cannot be zero");
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
		price: price,
	});
};

const updateProductNameByIdAndUserId = async (id, user_id, name) => {
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
	addProduct,
	removeProductByIdAndUserId,
	updateProductNameByIdAndUserId,
	updateProductPriceByIdAndUserId,
	decrementProductByIdAndUserId,
	incrementProductByIdAndUserId,
};
