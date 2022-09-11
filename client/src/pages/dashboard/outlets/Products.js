import { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Products = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [products, setProducts] = useState([]);
	const [noOfPages, setNoOfPages] = useState(0);
	const [page, setPage] = useState(1);

	const getProducts = async () => {
		try {
			console.log("fv");
			const response = await axiosPrivateInstance.get(`/products?page=${page}`);
			setProducts(
				response.data.serverData.products.map((product) => ({
					...product,
					deleteChecked: false,
				}))
			);
			setNoOfPages(
				Math.ceil(
					response.data.serverData.count /
						response.data.serverData.resultPerPage
				)
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getProducts();
	}, [page]);

	const deleteProduct = async (e) => {
		e.preventDefault();
		console.log(e.target.productId);
		try {
			const response = axiosPrivateInstance.delete(
				`/products/${e.target.productId.value}`
			);

			toast.promise(response, {
				pending: "Deleting Product, Please wait...",
				success: "Product has been Deleted!",
			});
			const resolved = await response;
			if (resolved.data.success)
				setProducts(
					products.filter((product) => {
						return product._id !== e.target.productId.value;
					})
				);
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
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
										<td className="border text-center">
											<div className=" min-w-full h-[20px] overflow-hidden">
												{product.name.trim()}
											</div>
										</td>
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
												{/* <form
													onSubmit={deleteProduct}
													className="text-red-400 mx-1"
												>
													<input
														type="hidden"
														name="productId"
														value={product._id}
													/> */}
												<button
													onClick={() =>
														setProducts(
															products &&
																products.map((deleteProduct) => {
																	return deleteProduct._id === product._id
																		? {
																				...deleteProduct,
																				deleteChecked: true,
																		  }
																		: { ...deleteProduct };
																})
														)
													}
													type="submit"
													className="text-red-400 mx-1"
												>
													Delete
												</button>
												{/* </form> */}
												{product.deleteChecked && (
													<div className="fixed backdrop-blur-sm top-0 left-0 flex w-full h-full items-center justify-center">
														<div className=" flex flex-col w-[95%] h-[95%] bg-slate-100/50 items-center justify-center">
															<p className="font-medium">Are you Sure?</p>
															<div className="flex">
																<form
																	onSubmit={(e) =>
																		deleteProduct(e, product._id)
																	}
																>
																	<input
																		type="hidden"
																		name="productId"
																		value={product._id}
																	/>

																	<button
																		type="submit"
																		className="mr-4 bg-primary text-white p-2 px-10 active:p-[8px] active:px-[32px] mt-2 rounded-md"
																	>
																		Delete
																	</button>
																</form>
																<button
																	className="mr-4 bg-slate-200 text-gray-800 p-2 px-10 active:p-[8px] active:px-[32px] mt-2 rounded-md"
																	onClick={() =>
																		setProducts(
																			products &&
																				products.map((deleteproduct) => {
																					console.log(product);
																					return deleteproduct._id ===
																						product._id
																						? {
																								...deleteproduct,
																								deleteChecked: false,
																						  }
																						: { ...deleteproduct };
																				})
																		)
																	}
																>
																	Cancel
																</button>
															</div>
														</div>
													</div>
												)}
											</div>
										</td>
									</>
								</tr>
							);
						})}
				</tbody>
			</table>
			{/* pagination */}
			<div className="flex justify-center mt-8 w-full">
				<button
					className="text-blue-500 disabled:text-slate-400 mr-2"
					disabled={page === 1}
					onClick={() => setPage((page) => page - 1)}
				>
					Previous
				</button>
				{[...Array(noOfPages)].map((_, i) => {
					return (
						<button
							key={i}
							className={`mr-2 px-2 py-1 rounded-sm ${
								page === i + 1 ? "bg-primary text-white" : ""
							}`}
							onClick={(e) => setPage(i + 1)}
						>
							{i + 1}
						</button>
					);
				})}
				<button
					className="text-blue-500 disabled:text-slate-400"
					onClick={() => setPage((page) => page + 1)}
					disabled={page === noOfPages}
				>
					Next
				</button>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default Products;
