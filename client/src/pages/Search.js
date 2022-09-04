import { useState } from "react";
import Product from "../components/common/Product";
import useAxios from "../hooks/useAxios";

const Search = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [searchedProducts, setSearchedProducts] = useState([]);
	const axiosInstance = useAxios();
	const getSearchedProducts = async (e) => {
		e.preventDefault();
		if (searchTerm.length > 0) {
			const response = await axiosInstance.get(
				`/products/search/${searchTerm}`
			);
			console.log(searchTerm);
			console.log(searchedProducts);
			setSearchedProducts(response.data.serverData.searchedProducts);
		}
	};
	return (
		<div>
			<div>
				<form onSubmit={getSearchedProducts}>
					<div className="flex w-2/3 my-5 items-center h-6">
						<label htmlFor="" className="text-xl mr-2">
							Search
						</label>
						<input
							type="text"
							name="search"
							id="search"
							className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 mr-2"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>

						<button
							className="bg-primary text-white p-2 px-8 active:p-[4px] active:px-[30px]  rounded-md"
							type="submit"
						>
							Search
						</button>
					</div>
				</form>
			</div>
			<div className="flex">
				{searchedProducts.map((searchedProduct) => {
					return (
						<Product key={searchedProduct._id} product={searchedProduct} />
					);
				})}
			</div>
		</div>
	);
};

export default Search;
