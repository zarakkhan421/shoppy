import { useState } from "react";
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
			setSearchedProducts(response.data.serverData.searchedProducts);
		}
	};
	console.log(searchedProducts);
	return (
		<div>
			<div>
				<form action="" onSubmit={getSearchedProducts}>
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
			<div>
				{searchedProducts.map((searchedProduct) => {
					return <div key={searchedProduct._id}>{searchedProduct.name}</div>;
				})}
			</div>
		</div>
	);
};

export default Search;
