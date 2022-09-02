import { useState } from "react";
import { Link } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import orderSummary from "../utils/orderSummary";
import { useDispatch } from "react-redux";
import { resetReduxCart, setReduxCart } from "../features/userSlice";
import { BsTrash } from "react-icons/bs";
const Cart = () => {
	const dispatch = useDispatch();
	const [quantity, setQuantity] = useState(1);
	const { getCart, setFullCart, resetCart, removeCartItem } = useLocalStorage();
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
	const handleQuantity = (e) => {
		console.log("sd");
		console.log(e.target);
		setCart((prev) =>
			prev.map((cartItem) => {
				return cartItem._id === e.target.id
					? {
							...cartItem,
							quantity: Number(e.target.value),
					  }
					: cartItem;
			})
		);
		dispatch(setReduxCart(getCart()));
	};

	// updates localstorage cart
	setFullCart(cart);
	// update redux cart
	dispatch(setReduxCart(cart));
	console.log("cart", getCart());
	return (
		<div className="flex justify-between">
			{console.log("render")}
			<div>
				<h2 className="text-2xl font-semibold">Items</h2>
				<div className="mb-4 flex items-center">
					<input
						type="checkbox"
						name="selectAll"
						onChange={handleItemCheckbox}
						className="mr-2"
						checked={
							cart.filter((cartItem) => cartItem.isChecked === false).length >
								0 || cart.length === 0
								? false
								: true
						}
					/>
					<label htmlFor="" className="text-2xl font-medium">
						Select All
					</label>
				</div>
				{cart.map((product) => {
					return (
						<div
							key={product._id}
							className="flex shadow px-4 pl-2 ml-[-0.5rem] py-9"
						>
							<input
								type="checkbox"
								name={product._id}
								id={product._id}
								onChange={handleItemCheckbox}
								checked={product.isChecked}
								className="mr-2 "
							/>
							<div className="mr-2">
								<img
									src={product?.image?.url}
									className="w-[80px] h-[80px] object-cover"
									alt=""
								/>
							</div>
							<div className="flex flex-col">
								<div className="text-2xl"> {product.name}</div>
								<div className="font-semibold">$ {product.price}</div>
								<div className="flex items-center">
									<label htmlFor="" className="text-xl mr-2">
										Quantity
									</label>
									<input
										type="number"
										name={product._id}
										id={product._id}
										onChange={(e) => {
											// setQuantity(e.target.value);
											handleQuantity(e);
										}}
										// value={quantity}
										value={
											cart.filter((cartItem) => cartItem._id === product._id)[0]
												.quantity === undefined
												? 1
												: cart.filter(
														(cartItem) => cartItem._id === product._id
												  )[0].quantity
										}
										className="border border-gray-2 rounded w:full outline-gray-1 h-6 mr-2"
									/>
									<button
										onClick={() => {
											removeCartItem(product);
											dispatch(setReduxCart(getCart()));
											setCart(getCart());
										}}
									>
										<BsTrash className="text-red-400 text-xl" />
									</button>
								</div>
							</div>
						</div>
					);
				})}
			</div>
			{/* <div>
				<button
					onClick={() => {
						resetCartHander();
						dispatch(resetReduxCart());
					}}
				>
					Remove all cart items
				</button>
			</div> */}
			<div className="flex flex-col items-start px-5 py-9 w-1/3 shadow-md">
				<h2 className="font-bold text-3xl mb-2">Order Summary</h2>
				<div className="flex mb-2">
					<span className="font-semibold text-xl mr-1">
						Subtotal of selected items:
					</span>
					<span className="font-semibold text-xl mr-1">$ {subTotal}</span>
				</div>
				<div className="flex mb-2">
					<span className="font-light text-xl mr-1">
						Per Item Shipping Cost:
					</span>
					<span className="font-light text-xl mr-1">
						$ {shippingCostPerItem}
					</span>
				</div>
				<div className="flex mb-2">
					<span className="font-light text-xl mr-1">Shipping Cost:</span>
					<span className="font-light text-xl mr-1">$ {totalShippingCost}</span>
				</div>
				<div className="flex mb-4 items-center">
					<span className="font-bold text-4xl mr-1">Total:</span>
					<span className="font-bold text-4xl mr-1">$ {total}</span>
				</div>
				<div className="flex self-center w-full">
					<Link
						to="/checkout"
						className="bg-primary px-8 py-2 rounded font-medium text-white w-full text-center"
					>
						Proceed to Checkout
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
