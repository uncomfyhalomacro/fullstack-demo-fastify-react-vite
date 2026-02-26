import { loadEnvFile } from "node:process";
import readline from "node:readline";

loadEnvFile();
const PORT = process.env.PORT || 8080;

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

function ask(question) {
	return new Promise((resolve) => rl.question(question, resolve));
}

async function main() {
	let notDone = true;

	while (notDone) {
		const pathPrefix = await ask("Provide path prefix: ");
		const method = await ask("Provide method: ");

		let data;
		let contentType = "";

		if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
			data = await ask("Provide data: ");
			contentType = await ask("Provide content type: ");
		}

		const url = `http://localhost:${PORT}/${pathPrefix}`;
		const headers = {};
		if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT") {
			headers["content-type"] =
				contentType.trim() === "" ? "text/plain; charset=utf-8" : contentType;
		}

		try {
			const result = await fetch(url, {
				method,
				headers,
				body: data,
			});
			const text = await result.text();
			console.log("Response:", text);
		} catch (err) {
			console.error("Fetch error:", err);
		}

		const done = await ask("Done? (y to exit) ");
		if (done.trim().toLowerCase() === "y") {
			notDone = false;
		}
	}

	rl.close();
	console.log("Exited loop.");
}

main();
