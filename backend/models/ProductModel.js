import { DataTypes, Model } from "sequelize";
import unit from "unitmath";
import { sequelize } from "../database/index.js";
import UserModel from "../models/UserModel.js";
import { insertUnitSystem } from "../helpers/insertUnitSystem.js";

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
				unique: false,
			},
			description: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			in_price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: 1,
				},
				defaultValue: 1,
			},
			price: {
				type: DataTypes.DECIMAL,
				allowNull: false,
				validate: {
					min: 1,
				},
				defaultValue: 1,
			},
			unit_system: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			unit: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isValidUnit(value) {
						if (!value) return;
						if (!unit.exists(value)) throw new Error("Invalid unit");
					},
				},
			},
			type: {
				type: DataTypes.STRING,
				allowNull: true,
				validate: {
					isIn: [["product", "service"]],
				},
				defaultValue: "product", // or "service"
			},
			count: {
				// NOTE: aliased as in stock in client
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
			sequelize,
			modelName: "products",
			hooks: {
				afterValidate: insertUnitSystem,
			},
		},
	);
};

await productModelInit();

export default ProductModel;

export { productModelInit };
