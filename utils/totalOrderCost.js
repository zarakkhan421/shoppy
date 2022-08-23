// takes array of objects; each object has a key/value pair of price:value; it adds and return prices in all objects in array
const totalOrderCost = (orderItems) => {
	let totalPrice = 0;
	for (let i = 0; i < orderItems.length; i++) {
		totalPrice += orderItems[i].price;
	}
	return totalPrice;
};

module.exports = { totalOrderCost };
