import { Sequelize } from "sequelize";
import { loadEnvFile } from "node:process";

loadEnvFile();
const PROD = process.env.PROD || "dev";
const PG_DB = process.env.PG_DB || "db";
const PG_USER = process.env.PG_USER || "";
const PG_PASSWORD = process.env.PG_PASSWORD || "";
const sequelize = new Sequelize(PG_DB, PG_USER, PG_PASSWORD, {
	host: "localhost",
	dialect: "postgres",
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
