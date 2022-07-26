const totalOrderPrice = (orderItems) => {
	let totalPrice = 0;
	for (let i = 0; i < orderItems.length; i++) {
		totalPrice += orderItems[i].price;
	}
	return totalPrice;
};

module.exports = { totalOrderPrice };
