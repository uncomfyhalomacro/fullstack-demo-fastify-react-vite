import "./App.css";
import LoginForm from "./features/auth/components/LoginForm.jsx";
import { useUser } from "./features/auth/hooks/useUser.jsx";
import { ProductsTable } from "./features/products/components/Products.jsx";
import { useGetProducts } from "./features/products/hooks/useGetProducts.jsx";

function App() {
	const { data: user, isLoading } = useUser();

	const {
		data: products,
		isLoading: loadingProducts,
		error,
		refetch,
	} = useGetProducts({
		user_id: user?.id,
		role: user?.role,
	});

	if (isLoading) return <div>Loading...</div>;

	return (
		<div>
			{!user ? (
				<LoginForm />
			) : (
				<>
					<h1>ID: {user.id}</h1>
					<h2>Welcome, {user.username}</h2>
					<h3>Email: {user.email}</h3>
					<h4>Role: {user.role}</h4>

					{!error ? (
						<ProductsTable
							refreshProducts={refetch}
							products={products}
							loadingProducts={loadingProducts}
						/>
					) : (
						<div>Something went wrong...</div>
					)}
				</>
			)}
		</div>
	);
}

export default App;
