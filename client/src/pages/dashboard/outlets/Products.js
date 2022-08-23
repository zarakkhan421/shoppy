import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Products = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [products, setProducts] = useState();
	let [productCount, setProductCount] = useState();

	const [productsError, setProductsError] = useState();
	const [deleteProductError, setProductError] = useState();
	const getProducts = async () => {
		try {
			console.log("fv");
			const response = await axiosPrivateInstance.get("/products");
			setProducts(response.data.serverData.products);
			setProductCount(Number(response.data.serverData.count));
			console.log(response);
		} catch (error) {
			setProductsError(error);
		}
	};
	useEffect(() => {
		getProducts();
	}, []);

	const deleteProduct = async (e) => {
		e.preventDefault();

		try {
			await axiosPrivateInstance.delete(
				`/products/${e.target.productId.value}`
			);
			const newProducts = products.filter((product) => {
				return product._id !== e.target.productId.value;
			});
			setProductCount((productCount -= 1));
			setProducts(newProducts);
		} catch (error) {
			setProductError(error);
		}
	};
	return (
		<>
			<div>{productCount}</div>
			<table className="table-fixed border-collapse w-full border border-orange">
				{/* <Outlet /> */}
				<thead className="">
					<tr>
						<th className="border border-orange-500">Name</th>
						<th className="border border-orange-500">Stock</th>
						<th className="border border-orange-500">Price</th>
						<th className="border border-orange-500">Featured</th>
						<th className="border border-orange-500">Published</th>
						<th className="border border-orange-500">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product) => {
							return (
								<tr key={product._id}>
									<>
										<td className="border border-orange-500 text-center">
											{product.name}
										</td>
										<td className="border border-orange-500 text-center">
											{product.stock}
										</td>
										<td className="border border-orange-500 text-center">
											{product.price}
										</td>
										<td className="border border-orange-500 text-center">
											{product.featured ? "True" : "False"}
										</td>
										<td className="border border-orange-500 text-center">
											{product.published ? "True" : "False"}
										</td>
										<td className="border border-orange-500 text-center">
											<Link to={`edit/${product._id}`}>Edit</Link>
											<form onSubmit={deleteProduct}>
												<input
													type="hidden"
													name="productId"
													value={product._id}
												/>
												<button type="submit">Delete</button>
											</form>
										</td>
									</>
								</tr>
							);
						})}
				</tbody>
			</table>
		</>
	);
};

export default Products;
