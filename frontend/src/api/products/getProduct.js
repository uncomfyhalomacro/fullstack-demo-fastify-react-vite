import { API_URL } from "../../env.js";

async function getProducts({ role, user_id }) {
	if (role === undefined) return [];
	if (user_id === undefined) return [];
	const url = `${API_URL}/${role}/products/${user_id}`;

	const response = await fetch(url, {
		method: "GET",
		credentials: "include",
	});

	const data = await response.json();
	return data;
}

export { getProducts };
