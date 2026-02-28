import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/index.js";
import { AsYouType } from "libphonenumber-js";
import { insertCountryCodeFromContactNumber } from "../helpers/insertCountryCodeFromContactNumber.js";

class UserModel extends Model {}

const userModelInit = async () => {
	UserModel.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			username: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			country_calling_code: {
				type: DataTypes.STRING,
				allowNull: true,
			},
			contact_number: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isValidNumber(value) {
						if (!value) return;
						try {
							const asYouType = new AsYouType();
							asYouType.input(value);
							if (!asYouType.isValid()) throw new Error("Invalid number");
						} catch (err) {
							throw new Error(`${err.message}`);
						}
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				validate: {
					isEmail: true,
				},
				allowNull: false,
				unique: true,
			},
			hashed_password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					isIn: [["seller", "admin"]],
				},
				defaultValue: "seller",
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
			modelName: "users",
			hooks: {
				afterValidate: insertCountryCodeFromContactNumber,
			},
		},
	);
};

await userModelInit();

export default UserModel;

export { userModelInit };
