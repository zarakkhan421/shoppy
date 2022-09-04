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
		<div>
			<h2 className="text-4xl font-bold my-2 w-full">Products</h2>
			<table className="table-fixed border-collapse w-full border border-orange">
				{/* <Outlet /> */}
				<thead className="">
					<tr className="bg-primary">
						<th className="border text-white font-semibold">Name</th>
						<th className="border text-white font-semibold">Image</th>
						<th className="border text-white font-semibold">Stock</th>
						<th className="border text-white font-semibold">Price</th>
						<th className="border text-white font-semibold">Featured</th>
						<th className="border text-white font-semibold">Published</th>
						<th className="border text-white font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{products &&
						products.map((product) => {
							return (
								<tr key={product._id}>
									<>
										<td className="border text-center">{product.name}</td>
										<td className="border text-center flex justify-center">
											<img
												src={product.image.url}
												className="h-10 w-10 p-auto text-center"
												alt=""
											/>
										</td>
										<td className="border text-center">{product.stock}</td>
										<td className="border text-center">{product.price}</td>
										<td className="border text-center">
											{product.featured ? "True" : "False"}
										</td>
										<td className="border text-center">
											{product.published ? "True" : "False"}
										</td>
										<td className="border text-center">
											<div className="flex justify-center">
												<Link
													to={`edit/${product._id}`}
													className="text-blue-400 mx-1"
												>
													Edit
												</Link>
												<form
													onSubmit={deleteProduct}
													className="text-red-400 mx-1"
												>
													<input
														type="hidden"
														name="productId"
														value={product._id}
													/>
													<button type="submit">Delete</button>
												</form>
											</div>
										</td>
									</>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default Products;
