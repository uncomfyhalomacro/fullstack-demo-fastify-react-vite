import { API_URL } from "../../env.js";

const fetchUserProfile = async () => {
	const response = await fetch(`${API_URL}/auth/user/profile`, {
		method: "GET",
		credentials: "include",
	});

	if (!response.ok) {
		throw new Error("Not authorized");
	}

	return await response.json();
};

export { fetchUserProfile };
