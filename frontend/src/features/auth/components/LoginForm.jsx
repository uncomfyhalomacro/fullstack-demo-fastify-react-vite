import { useLogin } from "../hooks/useLogin.jsx";

const LoginForm = () => {
	const { mutate, isPending, error } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();

		const formData = new FormData(e.target);

		mutate(formData)
	};
	console.log(error)

	return (
		<form onSubmit={handleSubmit}>
			<h2>Login</h2>

			<div>
				<label htmlFor="username">Username</label>
				<input name="username" type="text" required />
			</div>

			<div>
				<label htmlFor="password">Password</label>
				<input name="password" type="password" required />
			</div>

			<button type="submit" disabled={isPending}>
				{isPending ? "Logging in..." : "Login"}
			</button>

			{error && <p style={{ color: "red" }}>Login failed</p>}
		</form>
	);
};

export default LoginForm;
