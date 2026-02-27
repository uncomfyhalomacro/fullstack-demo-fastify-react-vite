import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./pages/LoginPage.jsx";
import { fetchUserProfile } from "./api/auth/profile.js";

const lngs = {
	en: { nativeName: "English" },
	se: { nativeName: "Svenska" },
};

function App() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const user = await fetchUserProfile();
				setUser(user);
			} catch (error) {
				console.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		checkAuth();
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{!user ? (
				<LoginPage onLogin={setUser} />
			) : (
				<>
					<h2>Welcome, {user.username}</h2>
					<h3>Email: {user.email}</h3>
					<h4>Role: {user.role}</h4>
				</>
			)}
		</div>
	);
}

export default App;
