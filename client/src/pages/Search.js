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
					<label htmlFor="">Search</label>
					<input
						type="text"
						name="search"
						id="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button type="submit">Search</button>
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
