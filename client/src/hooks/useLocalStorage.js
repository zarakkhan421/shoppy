export const useLocalStorage = () => {
	const getCart = () => {
		const cart = JSON.parse(localStorage.getItem("cart"));
		return cart === null ? [] : cart;
	};

	const addToCart = (product) => {
		let cart = getCart();
		const found = cart.filter((cartProduct) => cartProduct._id === product._id);
		if (found.length === 0) {
			cart.push(product);
			localStorage.setItem("cart", JSON.stringify(cart));
		}
	};

	// this function has to run to ensure that cart state in component is updated in local storage as well
	const setFullCart = (cart) => {
		localStorage.setItem("cart", JSON.stringify(cart));
	};
	const resetCart = () => {
		localStorage.removeItem("cart");
	};

	const removeCartItem = (product) => {
		const cart = getCart();
		const newCart = cart.filter((cartProduct) => {
			return cartProduct._id !== product._id;
		});
		setFullCart(newCart);
	};

	return { addToCart, getCart, removeCartItem, setFullCart, resetCart };
};
