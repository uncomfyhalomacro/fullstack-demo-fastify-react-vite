import isSafeNumber from "../../helpers/isSafeNumber.js";
import ProductModel from "../../models/ProductModel.js";

const getProductsByUserId = async ({ user_id }) => {
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}

	return await ProductModel.findAll({
		where: {
			user_id: user_id,
		},
	});
};

const addProductByUserId = async ({
	user_id,
	name,
	in_price,
	price,
	type,
	description,
	unit,
}) => {
	if (!name || name.trim() === "") {
		throw new Error("name is missing");
	}
	if (!price) {
		throw new Error("price is missing");
	}
	const cprice = Number(price);
	if (cprice === 0) {
		throw new Error("price cannot be zero");
	}
	if (!isSafeNumber(cprice) || !Number.isSafeInteger(cprice))
		throw new Error("price number has exceeded safe limits");

	if (!in_price) {
		throw new Error("in_price is missing");
	}
	const cin_price = Number(in_price);
	if (cin_price === 0) {
		throw new Error("in_price cannot be zero");
	}
	if (!isSafeNumber(cin_price) || !Number.isSafeInteger(cin_price))
		throw new Error("in_price number has exceeded safe limits");

	if (!type || type.trim() === "") {
		throw new Error("type is missing");
	}
	if (!user_id || user_id.trim() === "") {
		throw new Error("user_id is missing");
	}
	await ProductModel.create(
		{
			user_id,
			name,
			in_price,
			price,
			type,
			description,
			unit,
		},
	);
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

const assertNonEmptyString = (value, field) => {
	if (!value?.trim()) {
		throw new Error(`${field} is missing`);
	}
};

const updateProductFieldByIdAndUserId = async ({
	id,
	user_id,
	field,
	value,
}) => {
	assertNonEmptyString(id, "id");
	assertNonEmptyString(user_id, "user_id");

	const [updatedRows] = await ProductModel.update(
		{ [field]: value },
		{ where: { id, user_id } },
	);

	if (updatedRows === 0) {
		throw new Error("product does not exist");
	}
};

const updateProductNameByIdAndUserId = async ({ id, user_id, name }) => {
	assertNonEmptyString(name, "name");

	await updateProductFieldByIdAndUserId({
		id,
		user_id,
		field: "name",
		value: name.trim(),
	});
};

const updateProductTypeByIdAndUserId = async ({ id, user_id, type }) => {
	assertNonEmptyString(type, "type");

	await updateProductFieldByIdAndUserId({
		id,
		user_id,
		field: "type",
		value: type.trim(),
	});
};

const updateProductPriceByIdAndUserId = async ({ id, user_id, price }) => {
	if (price === undefined || price === null) {
		throw new Error("price is missing");
	}

	const cprice = Number(price);

	if (!Number.isFinite(cprice)) {
		throw new Error("price must be a valid number");
	}

	if (cprice === 0) {
		throw new Error("price cannot be zero");
	}

	if (!Number.isSafeInteger(cprice)) {
		throw new Error("price number has exceeded safe limits");
	}

	await updateProductFieldByIdAndUserId({
		id,
		user_id,
		field: "price",
		value: cprice,
	});
};

export {
	addProductByUserId,
	getProductsByUserId,
	decrementProductByIdAndUserId,
	incrementProductByIdAndUserId,
	removeProductByIdAndUserId,
	updateProductNameByIdAndUserId,
	updateProductPriceByIdAndUserId,
	updateProductTypeByIdAndUserId,
};
