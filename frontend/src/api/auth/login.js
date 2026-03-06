import { API_URL } from "../../env.js";

async function fetchLogin(formData) {
	if (!formData === undefined) return { success: false };
	const username = formData.get("username");
	const password = formData.get("password");
	const url = `${API_URL}/auth/user/login`;
	const res = await fetch(url, {
		method: "POST",
		body: JSON.stringify({ username, password }),
		headers: { "Content-Type": "application/json" },
		credentials: "include",
	});

	if (!res.ok) {
		return undefined;
	}

	return await res.json();
}

export { fetchLogin };
