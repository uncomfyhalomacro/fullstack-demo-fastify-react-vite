import "./App.css";
import LoginForm from "./features/auth/components/LoginForm.jsx";
import { useUser } from "./features/auth/hooks/useUser.jsx";
import { ProductsTable } from "./features/products/components/Products.jsx";
import { useGetProducts } from "./features/products/hooks/useGetProducts.jsx";
import { ButtonExtras } from "./features/ui/Extras.jsx";
import { MenuSection } from "./features/ui/menu/Menu.jsx";
import { NavBar } from "./features/ui/NavBar.jsx";
import { ArticleSearch, ProductSearch } from "./features/ui/Search.jsx";

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
					<NavBar user={user} />
					{!error ? (
						<div className="h-container">
							<div className="left">
								<div className="left-subcontainer">
									<MenuSection />
								</div>
							</div>
							<div className="right">
								<div className="right-subcontainer">
									<div className="u-input-section">
										<div className="u-input-split">
											<div className="u-search">
												<ArticleSearch />
												<ProductSearch />
											</div>
											<ButtonExtras />
										</div>
									</div>
									<ProductsTable
										refreshProducts={refetch}
										products={products}
										loadingProducts={loadingProducts}
									/>
								</div>
							</div>
						</div>
					) : (
						<div>Something went wrong...</div>
					)}
				</>
			)}
		</div>
	);
}

export default App;
