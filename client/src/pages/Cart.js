import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import orderSummary from "../utils/orderSummary";

const Cart = () => {
	const { getCart, setFullCart, resetCart } = useLocalStorage();
	const [cart, setCart] = useState(
		getCart().map((cartItem) => ({
			...cartItem,
			isChecked: false,
		}))
	);

	const { subTotal, totalShippingCost, total, shippingCostPerItem } =
		orderSummary(cart);

	const resetCartHander = () => {
		resetCart();
		setCart([]);
	};

	const handleItemCheckbox = (e) => {
		if (e.target.name === "selectAll") {
			setCart((prev) =>
				prev.map((state) =>
					e.target.checked === true
						? { ...state, isChecked: e.target.checked }
						: { ...state, isChecked: e.target.checked }
				)
			);
		} else if (e.target.name !== "selectAll") {
			setCart((prev) =>
				prev.map((state) =>
					state._id === e.target.name
						? { ...state, isChecked: e.target.checked }
						: state
				)
			);
		}
	};

	// updates localstorage cart
	setFullCart(cart);

	return (
		<div className="flex">
			{console.log("render")}
			<div>
				<h2>Items</h2>
				<div className="mb-4">
					<input
						type="checkbox"
						name="selectAll"
						onChange={handleItemCheckbox}
						checked={
							cart.filter((cartItem) => cartItem.isChecked === false).length >
								0 || cart.length === 0
								? false
								: true
						}
					/>
					<label htmlFor="">Select All</label>
				</div>
				{cart.map((product) => {
					return (
						<div key={product._id} className="flex">
							<input
								type="checkbox"
								name={product._id}
								id={product._id}
								onChange={handleItemCheckbox}
								checked={product.isChecked}
							/>
							<div> {product.name}</div>
							<div>{product._id}</div>
							<div>----{product.price}</div>
						</div>
					);
				})}
			</div>
			<div>
				<button onClick={resetCartHander}>Remove all cart items</button>
			</div>
			<div>
				<h2>Order Summary</h2>
				<div>
					<span>Subtotal of selected items:</span>
					<span>{subTotal}</span>
				</div>
				<div>
					<span>Per Item Shipping Cost:</span>
					<span>{shippingCostPerItem}</span>
				</div>
				<div>
					<span>Shipping Cost:</span>
					<span>{totalShippingCost}</span>
				</div>
				<div>
					<span>Total:</span>
					<span>{total}</span>
				</div>
			</div>
			<Link to="/checkout">Proceed to Checkout</Link>
		</div>
	);
};

export default Cart;
