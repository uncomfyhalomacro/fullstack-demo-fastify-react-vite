import { useLogin } from "../hooks/useLogin.jsx";

const LoginForm = () => {
	const { mutate, isPending, error } = useLogin();

	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		mutate(formData);
	};

	return (
		<div className="modal-overlay">
			<div className="modal-card">
				<form onSubmit={handleSubmit} className="login-form">
					<h2>Login</h2>

					<div className="form-group">
						<label htmlFor="username">Username</label>
						<input name="username" type="text" required />
					</div>

					<div className="form-group">
						<label htmlFor="password">Password</label>
						<input name="password" type="password" required />
					</div>

					<button type="submit" className="login-btn" disabled={isPending}>
						{isPending ? "Logging in..." : "Login"}
					</button>

					{error && <p className="error-message">Login failed</p>}
				</form>
			</div>
		</div>
	);
};

export default LoginForm;
