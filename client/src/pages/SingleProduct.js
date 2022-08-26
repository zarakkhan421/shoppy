import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { cart } from "../features/userSlice";
const SingleProduct = () => {
	const [product, setProduct] = useState();
	const params = useParams();
	const productId = params.id;
	const dispatch = useDispatch();

	const { addToCart, getCart, removeCartItem } = useLocalStorage();

	const handleBuyNow = () => {
		console.log("buy");
		addToCart(product);
		console.log(getCart());
		dispatch(cart(getCart()));
	};
	const handleAddToCart = () => {
		console.log("add");
		addToCart(product);
		console.log(getCart());
		dispatch(cart(getCart()));
	};
	const handleRemoveCartItem = () => {
		console.log(getCart());
		removeCartItem(product);
		console.log(getCart());
		dispatch(cart(getCart()));
	};
	useEffect(() => {
		const getProduct = async () => {
			const response = await axios.get(
				`http://localhost:5000/api/products/${productId}`
			);
			setProduct(response.data.serverData.product);
		};
		getProduct();
	}, []);
	return (
		<div>
			<div>Name: {product?.name}</div>
			<button onClick={handleBuyNow}>Buy Now</button>
			<button onClick={handleAddToCart}>Add to Cart</button>
			<button onClick={handleRemoveCartItem}>Remove from Cart</button>
		</div>
	);
};

export default SingleProduct;
