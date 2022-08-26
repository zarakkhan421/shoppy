import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import Product from "../components/common/Product";
import useAxios from "../hooks/useAxios";

let priceChanged = false;
const Shop = () => {
	const axiosInstance = useAxios();
	const [products, setProducts] = useState([]);
	const [countProduct, setCountProduct] = useState(0);

	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000);
	const [ratings, setRatings] = useState(0);
	console.log(ratings);
	const getProducts = async () => {
		try {
			const response = await axiosInstance.get(
				`/products?price[gte]=${Number(minPrice)}&price[lte]=${Number(
					maxPrice
				)}&ratings=${Number(ratings)}`
			);
			console.log(response);
			setProducts(response.data.serverData.products);
			if (!priceChanged) {
				setMaxPrice(response.data.serverData.maxProductPrice[0].price);
			}
			setCountProduct(response.data.serverData.count);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getProducts();
	}, [minPrice, maxPrice, ratings]);

	const onChangePrice = (e) => {
		console.log(e.target.name);
		if (e.target.name === "minValue") {
			const diff = maxPrice - e.target.value;
			if (diff >= 1) {
				if (e.target.value >= 0) setMinPrice(e.target.value);
			}
		} else {
			const diff = e.target.value - minPrice;
			if (diff >= 1) {
				priceChanged = true;
				setMaxPrice(e.target.value);
			}
		}
	};

	return (
		<div className="flex flex-col">
			<div>
				<label htmlFor="">Min Value</label>
				<input
					type="text"
					name="minValue"
					id="minValue"
					value={minPrice}
					onChange={onChangePrice}
				/>
				<label htmlFor="">Max Value</label>
				<input
					type="text"
					name="maxValue"
					id="maxValue"
					value={maxPrice}
					onChange={onChangePrice}
				/>
				<label htmlFor="">Ratings Above </label>
				<select
					name="rating"
					id="rating"
					value={ratings}
					onChange={(e) => setRatings(e.target.value)}
				>
					<option value="5">5</option>
					<option value="4">4 and up</option>
					<option value="3">3 and up</option>
					<option value="2">2 and up</option>
					<option value="1">1 and up</option>
					<option value="0">0 and up</option>
				</select>
			</div>
			<div>
				<h2> All Products </h2>
				<div>{countProduct}</div>
				<div className="flex">
					{products.map((product) => {
						return <Product key={product._id} product={product} />;
					})}
				</div>
			</div>
		</div>
	);
};

export default Shop;
