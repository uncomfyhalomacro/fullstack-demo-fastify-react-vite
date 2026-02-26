import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/index.js";
import UserModel from "../models/UserModel.js";

class ProductModel extends Model {}

const productModelInit = async () => {
	ProductModel.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			user_id: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: UserModel,
					key: "id",
				},
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			price: {
				type: DataType.DECIMAL,
				allowNull: false,
				validate: {
					min: 1,
				},
				defaultValue: 1,
			},
			type: {
				type: DataTypes.STRING,
				allowNull: true,
				defaultValue: "product", // or "service"
			},
			count: {
				type: DataTypes.BIGINT,
				allowNull: false,
				validate: {
					min: 0,
				},
				defaultValue: 0,
			},
			createdAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
			updatedAt: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			// Other model options go here
			sequelize, // We need to pass the connection instance
			modelName: "products", // We need to choose the model name
		},
	);
};

await productModelInit();

export default ProductModel;

export { productModelInit };
