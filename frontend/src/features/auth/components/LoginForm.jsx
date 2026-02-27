import { useState } from "react";
import { fetchLogin } from "../../../api/auth/login.js";

const LoginForm = ({ onLogin }) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		if (!username || !password) {
			setError("Username and password are required.");
			return;
		}

		setLoading(true);
		try {
			// Replace this with your real API call
			const {
				username: fetchedUsername,
				email,
				role,
			} = await fetchLogin({
				username,
				password,
			});
			console.log(fetchedUsername, email, role);
			onLogin?.({ username: fetchedUsername, email, role });
		} catch (err) {
			setError(err.message ?? "Login failed");
		} finally {
			setLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} style={{ maxWidth: 300, margin: "auto" }}>
			<h2>Login</h2>

			<div style={{ marginBottom: 10 }}>
				<label htmlFor="username_input">Username</label>
				<input
					type="text"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					style={{ width: "100%", padding: 5 }}
				/>
			</div>

			<div style={{ marginBottom: 10 }}>
				<label htmlFor="password_input">Password</label>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					style={{ width: "100%", padding: 5 }}
				/>
			</div>

			{error && <p style={{ color: "red" }}>{error}</p>}

			<button
				type="submit"
				disabled={loading}
				style={{ width: "100%", padding: 8 }}
			>
				{loading ? "Logging in..." : "Login"}
			</button>
		</form>
	);
};

export default LoginForm;
