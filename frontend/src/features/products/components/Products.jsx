const RefreshProductButton = ({ refreshProducts }) => {
	return (
		<button type="button" onClick={refreshProducts}>
			Refresh Products
		</button>
	);
};

const ProductsTable = ({ refreshProducts, products, loadingProducts }) => {
	if (loadingProducts) return <div>Loading products...</div>;

	if (!Array.isArray(products) || products.length === 0) {
		return (
			<div className="table-container">
				<table>
					<thead>
						<tr>
							<th>Article No</th>
							<th>Name</th>
							<th>Description</th>
							<th>In Price</th>
							<th>Price</th>
							<th>In Stock</th>
							<th>Created</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={9}>NO PRODUCTS</td>
						</tr>
					</tbody>
				</table>
			</div>
		);
	}

	return (
		<div className="table-container">
			<table>
				<thead>
					<tr>
						<th>Article No</th>
						<th>Name</th>
						<th>Description</th>
						<th>In Price</th>
						<th>Price</th>
						<th>In Stock</th>
						<th>Created</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>{product.id}</td>
							<td>{product.name}</td>
							<td>{product.description}</td>
							<td>{Number(product.in_price).toLocaleString()}</td>
							<td>{Number(product.price).toLocaleString()}</td>
							<td>{Number(product.count)}</td>
							<td>{new Date(product.createdAt).toLocaleDateString()}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export { ProductsTable, RefreshProductButton };
