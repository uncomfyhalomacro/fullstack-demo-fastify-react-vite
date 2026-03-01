const RefreshProductButton = ({ refreshProducts }) => {
	return (
		<button type="button" onClick={refreshProducts}>
			Refresh Products
		</button>
	);
};

const ProductsTable = ({ refreshProducts, products, loadingProducts }) => {
	return (
		<div>
			<RefreshProductButton refreshProducts={refreshProducts} />
			{loadingProducts ? (
				<div>Loading products...</div>
			) : !products || products.length === 0 ? (
				<>No products</>
			) : (
				<div className="table-container">
					<table>
						<thead>
							<tr>
								<th>Article ID</th>
								<th>Name</th>
								<th>Description</th>
								<th>In Price</th>
								<th>Price</th>
								<th>Count</th>
								<th>Unit</th>
								<th>Type</th>
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
									<td>{product.unit}</td>
									<td>{product.type}</td>
									<td>{new Date(product.createdAt).toLocaleDateString()}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
};

export { ProductsTable, RefreshProductButton };
