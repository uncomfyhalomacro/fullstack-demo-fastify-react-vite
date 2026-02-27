import { API_URL } from "../../env.js";

async function fetchLogin({ username, password }) {
	const url = `${API_URL}/auth/user/login`;
	const response = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			username,
			password,
		}),
		credentials: "include",
	});
	const status = response.status;
	const body = await response.json();
	if (status === 200) {
		return {
			username: body.username,
			role: body.role,
			email: body.email,
		};
	}
	throw new Error(body.message);
}

export { fetchLogin };
