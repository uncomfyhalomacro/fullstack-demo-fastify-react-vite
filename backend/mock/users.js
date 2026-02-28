import { writeFile } from "node:fs/promises";
import path from "node:path";
import { loadEnvFile } from "node:process";
import { fileURLToPath } from "node:url";
import { faker } from "@faker-js/faker";
import { sequelize } from "../database/index.js";
import UserModel from "../models/UserModel.js";
import { register } from "../services/auth/core.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

loadEnvFile();
const PROD = process.env.PROD || "dev";

const users = Array.from({ length: 100 }, () => ({
	username: faker.internet.username(),
	contact_number: faker.phone.number({ style: "international" }),
	email: faker.internet.email(),
	password: faker.internet.password(),
}));

async function resetTable() {
	await sequelize.authenticate(); // optional but recommended
	await UserModel.sync({ force: true }); // CREATE TABLE

	console.log("User table recreated");
}

async function generateMockUsers() {
	console.warn("Dropping user table");
	const results = await Promise.allSettled(
		users.map(async (user) => {
			await register(
				user.username,
				user.password,
				user.email,
				user.contact_number,
			);
			return user;
		}),
	);
	console.log(results);
	const pathToUserJson = `${__dirname}/users.json`;
	const jsonData = JSON.stringify(
		results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value),
		null,
		"\t",
	);
	await writeFile(pathToUserJson, jsonData);
	return results;
}

if (PROD === "dev") {
	await resetTable();
	await generateMockUsers();
}
