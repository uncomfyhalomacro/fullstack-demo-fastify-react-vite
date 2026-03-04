import "./App.css";
import LoginForm from "./features/auth/components/LoginForm.jsx";
import { useUser } from "./features/auth/hooks/useUser.jsx";
import { ProductsTable } from "./features/products/components/Products.jsx";
import { useGetProducts } from "./features/products/hooks/useGetProducts.jsx";
import { Menu } from "./features/ui/menu/Menu.jsx";
import { NavBar } from "./features/ui/NavBar.jsx";

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
								<Menu />
							</div>
							<div className="right">
								<div className="u-input-section">
									<div className="u-input-split">
										<div className="u-search">
											<div>
												<label htmlFor="search-article-no">
													<input
														className="search"
														type="text"
														placeholder="Search Article No. ..."
													/>
												</label>
											</div>
											<div>
												<label htmlFor="search-product">
													<input
														className="search"
														type="text"
														placeholder="Search Products ..."
													/>
												</label>
											</div>
										</div>
										<div className="h-button-extras">
											<button type="button">New Product +</button>
											<button type="button">Print List</button>
											<button type="button">Advanced Mode</button>
										</div>
									</div>
								</div>
								<ProductsTable
									refreshProducts={refetch}
									products={products}
									loadingProducts={loadingProducts}
								/>
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
