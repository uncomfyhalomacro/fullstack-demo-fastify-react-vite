import { API_URL } from "../../env.js";

async function fetchLogout() {
	const url = `${API_URL}/auth/user/logout`;
	const res = await fetch(url, {
		method: "GET",
		credentials: "include",
	});

	if (!res.ok) {
		return { success: false };
	}

	return { success: true };
}

export { fetchLogout };
