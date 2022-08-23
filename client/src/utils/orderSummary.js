const orderSummary = (cart) => {
	let subTotal = 0;
	let totalShippingCost = 0;
	let shippingCostPerItem = 2;
	subTotal = cart.reduce((total, cartItem) => {
		if (cartItem.isChecked === false) {
			return total + 0;
		}
		return total + cartItem.price;
	}, 0);
	totalShippingCost = cart.reduce((total, cartItem) => {
		if (cartItem.isChecked === false) {
			return total + 0;
		}
		return total + shippingCostPerItem;
	}, 0);

	let total = subTotal + totalShippingCost;
	return { subTotal, totalShippingCost, total, shippingCostPerItem };
};

export default orderSummary;
