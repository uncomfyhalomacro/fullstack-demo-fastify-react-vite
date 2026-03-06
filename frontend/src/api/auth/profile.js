import { API_URL } from "../../env.js";

const fetchUserProfile = async () => {
	try {
		const response = await fetch(`${API_URL}/auth/user/profile`, {
			method: "GET",
			credentials: "include",
		});

		if (!response.ok) {
			return null;
		}

		return await response.json();
	} catch (err) {
		console.error(err);
		return null;
	}
};

export { fetchUserProfile };
