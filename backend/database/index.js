import { Sequelize } from "sequelize";
import { PG_DB, PG_PASSWORD, PG_USER, PROD, PG_HOST } from "../env.js";

const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
	host: PG_HOST,
	dialect: "postgres",
	ssl: PROD === "prod"
});

sequelize
	.authenticate()
	.then(async () => {
		await sequelize.sync({ alter: PROD === "dev" }).then(() => {
			console.log("Database synchronized");
		});
		console.log("Connection has been established successfully");
	})
	.catch((err) => {
		console.error("Unable to connect to the database:", err);
	});

export { sequelize };
