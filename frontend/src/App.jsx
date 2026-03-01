import "./App.css";
import { useAuth } from "./features/auth/hooks/useAuth.jsx";
import { ProductsTable } from "./features/products/components/Products.jsx";
import { useGetProducts } from "./features/products/hooks/useGetProducts.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const _lngs = {
	en: { nativeName: "English" },
	se: { nativeName: "Svenska" },
};

function App() {
	const { user, setUser, loading: loadingUser } = useAuth();
	const {
		data: products,
		isLoading: loadingProducts,
		error,
		refetch,
	} = useGetProducts({
		user_id: user?.id,
		role: user?.role,
	});

	if (loadingUser) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{!user ? (
				<LoginPage onLogin={setUser} />
			) : (
				<>
					<h1>ID: {user.id}</h1>
					<h2>Welcome, {user.username}</h2>
					<h3>Email: {user.email}</h3>
					<h4>Role: {user.role}</h4>
					{error === null ? (
						<ProductsTable
							refreshProducts={refetch}
							products={products}
							loadingProducts={loadingProducts}
						/>
					) : (
						<div>Something went wrong when loading products data...</div>
					)}
				</>
			)}
		</div>
	);
}

export default App;
