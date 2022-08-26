import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocalStorage } from "../hooks/useLocalStorage";
import orderSummary from "../utils/orderSummary";
import { getIsLoggedIn, getUserId } from "../features/userSlice";
import { useSelector } from "react-redux";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
	const navigate = useNavigate();
	const { getCart, resetCart } = useLocalStorage();
	const [checkoutDetails, setCheckoutDetails] = useState({});
	const [isChangedAddresses, setIsChangedAddresses] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const [homeAddressRadio, setHomeAddressRadio] = useState(false);
	const [shippingAddressRadio, setShippingAddressRadio] = useState(false);
	const [newAddressRadio, setNewAddressRadio] = useState(false);

	const [updateAddressesCheck, setUpdateAddressesCheck] = useState(false);

	const [homeAddress, setHomeAddress] = useState("");
	const [homeState, setHomeState] = useState("");
	const [homeCity, setHomeCity] = useState("");
	const [homeZipCode, setHomeZipCode] = useState("");
	const [shippingAddress, setShippingAddress] = useState("");
	const [shippingState, setShippingState] = useState("");
	const [shippingCity, setShippingCity] = useState("");
	const [shippingZipCode, setShippingZipCode] = useState("");
	const [newAddress, setNewAddress] = useState("");
	const [newState, setNewState] = useState("");
	const [newCity, setNewCity] = useState("");
	const [newZipCode, setNewZipCode] = useState("");

	const cart = getCart();

	const { subTotal, totalShippingCost, total, shippingCostPerItem } =
		orderSummary(cart);
	const axiosPrivateInstance = useAxiosPrivate();
	const axiosInstance = useAxios();
	const userId = useSelector(getUserId);
	const isLoggedIn = useSelector(getIsLoggedIn);
	console.log("1");
	const user = useSelector((state) => {
		if (isLoggedIn) {
			return state.auth.user.serverData.user;
		}
	});

	useEffect(() => {
		console.log("2");
		if (isLoggedIn) {
			setFirstName(user.firstName);
			setLastName(user.lastName);
			setPhoneNumber(user.phoneNumber);
			setEmail(user.email);

			const getCheckoutDetails = async () => {
				const response = await axiosPrivateInstance.get(
					`user/checkout-details/${userId}`
				);
				console.log("3");
				console.log(response);
				setCheckoutDetails(response.data.serverData.checkoutDetails);
				console.log("zc", checkoutDetails);
			};
			getCheckoutDetails();
			console.log("4");
		} else {
			setNewAddressRadio(true);
		}
	}, []);

	// reruns when gets addresses
	useEffect(() => {
		if (
			isLoggedIn &&
			checkoutDetails.addresses &&
			checkoutDetails.phoneNumber
		) {
			setHomeAddress(checkoutDetails.addresses.homeAddress?.address);
			setHomeCity(checkoutDetails.addresses.homeAddress?.city);
			setHomeState(checkoutDetails.addresses.homeAddress?.state);
			setHomeZipCode(checkoutDetails.addresses.homeAddress?.zipCode);

			setShippingAddress(checkoutDetails.addresses.shippingAddress?.address);
			setShippingCity(checkoutDetails.addresses.shippingAddress?.city);
			setShippingState(checkoutDetails.addresses.shippingAddress?.state);
			setShippingZipCode(checkoutDetails.addresses.shippingAddress?.zipCode);
			setPhoneNumber(checkoutDetails.phoneNumber);
		}
		console.log("sd");
	}, [checkoutDetails]);

	console.log("7");
	const onChangeAddressHandler = (e) => {
		console.log(e.target);
		if (
			e.target.name === "homeAddress" ||
			e.target.name === "homeCity" ||
			e.target.name === "homeState" ||
			e.target.name === "homeZipCode" ||
			e.target.name === "shippingAddress" ||
			e.target.name === "shippingCity" ||
			e.target.name === "shippingState" ||
			e.target.name === "shippingZipCode"
		) {
			setIsChangedAddresses(true);
			console.log("changed");
			console.log(isChangedAddresses);
		}
		if (e.target.name === "homeAddressRadio") {
			setHomeAddressRadio(true);
			setShippingAddressRadio(false);
			setNewAddressRadio(false);
		} else if (e.target.name === "shippingAddressRadio") {
			setHomeAddressRadio(false);
			setShippingAddressRadio(true);
			setNewAddressRadio(false);
		} else if (e.target.name === "newAddressRadio") {
			setHomeAddressRadio(false);
			setShippingAddressRadio(false);
			setNewAddressRadio(true);
		}
	};

	const submitOrderHandler = async (e) => {
		e.preventDefault();
		const cart = getCart();
		console.log("cart", cart);
		const customerDetails = {
			firstName,
			lastName,
			email,
			phoneNumber,
		};
		const orderItems = cart.map((cartItem) => ({
			name: cartItem.name,
			price: cartItem.price,
			quantity: cartItem.quantity,
			product: cartItem._id,
			sale: cartItem.sale ? cartItem.sale : 0,
		}));

		let deliveryAddress = {};
		if (homeAddressRadio) {
			deliveryAddress = {
				address: homeAddress,
				city: homeCity,
				state: homeState,
				zipCode: Number(homeZipCode),
			};
		} else if (shippingAddressRadio) {
			deliveryAddress = {
				address: shippingAddress,
				city: shippingCity,
				state: shippingState,
				zipCode: Number(shippingZipCode),
			};
		} else if (newAddressRadio) {
			deliveryAddress = {
				address: newAddress,
				city: newCity,
				state: newState,
				zipCode: Number(newZipCode),
			};
		}

		const order = {
			customerDetails,
			deliveryAddress,
			orderItems,
			user: userId,
			shippingCost: totalShippingCost,
		};

		try {
			const response = await axiosInstance.post("/orders", order);
			console.log(response);
			navigate("/");
			if (response.data.success) {
				resetCart();
			}
		} catch (error) {
			console.log(error);
		}
		if (updateAddressesCheck) {
			const data = {
				addresses: {
					shippingAddress: {
						address: shippingAddress,
						state: shippingState,
						city: shippingCity,
						zipCode: shippingZipCode,
					},
					homeAddress: {
						address: homeAddress,
						state: homeState,
						city: homeCity,
						zipCode: homeZipCode,
					},
				},
			};
			try {
				const response = await axiosPrivateInstance.put("/user", data);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		}
		console.log(order);
		console.log("order items", orderItems);
		console.log("customer details", customerDetails);
	};

	return (
		<div className="flex">
			<div>
				<form onSubmit={submitOrderHandler}>
					<h2>Personal Information</h2>
					<div className="flex">
						<label htmlFor="">First Name</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							className="border border-red-500"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
						/>
						<label htmlFor="">Last Name</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							className="border border-red-500"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
						/>
					</div>
					<div className="flex">
						<label htmlFor="">Phone</label>
						<input
							type="text"
							name="phoneNumber"
							id="phoneNumber"
							className="border border-red-500"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
						<label htmlFor="">Email</label>
						<input
							type="text"
							name="email"
							id="email"
							className="border border-red-500"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<hr />

					<h2>Delivery Details</h2>
					{/* radios */}
					<div className="flex">
						{isLoggedIn && (
							<>
								<input
									type="radio"
									name="homeAddressRadio"
									checked={homeAddressRadio}
									onChange={onChangeAddressHandler}
								/>
								<label htmlFor="">Same as Home Address</label>
								<input
									type="radio"
									name="shippingAddressRadio"
									checked={shippingAddressRadio}
									onChange={onChangeAddressHandler}
								/>
								<label htmlFor="">Same as Shipping Address</label>
							</>
						)}

						{isLoggedIn ? (
							<>
								<input
									type="radio"
									name="newAddressRadio"
									checked={newAddressRadio}
									onChange={onChangeAddressHandler}
								/>
								<label htmlFor="">Enter New Delivery Address</label>
							</>
						) : (
							<label htmlFor="">Enter Delivery Address</label>
						)}
					</div>
					{/* radios end */}

					{/* home address form */}
					{homeAddressRadio && (
						<div>
							<div className="flex">
								<label htmlFor="">Address</label>
								<input
									type="text"
									name="homeAddress"
									id="homeAddress"
									className="border border-red-500"
									value={homeAddress}
									onChange={(e) => {
										setHomeAddress(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
								<label htmlFor="">Town/City</label>
								<input
									type="text"
									name="homeCity"
									id="homeCity"
									className="border border-red-500"
									value={homeCity}
									onChange={(e) => {
										setHomeCity(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
							</div>
							<div className="flex">
								<label htmlFor="">State</label>
								<input
									type="text"
									name="homeState"
									id="homeState"
									className="border border-red-500"
									value={homeState}
									onChange={(e) => {
										setHomeState(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
								<label htmlFor="">Zip Code</label>
								<input
									type="text"
									name="homeZipCode"
									id="homeZipCode"
									className="border border-red-500"
									value={homeZipCode}
									onChange={(e) => {
										setHomeZipCode(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
							</div>
						</div>
					)}
					{/* home address form end */}

					{/* shipping address form */}
					{shippingAddressRadio && (
						<div>
							<div className="flex">
								<label htmlFor="">Address</label>
								<input
									type="text"
									name="shippingAddress"
									id="shippingAddress"
									className="border border-red-500"
									value={shippingAddress}
									onChange={(e) => {
										setShippingAddress(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
								<label htmlFor="">Town/City</label>
								<input
									type="text"
									name="shippingCity"
									id="shippingCity"
									className="border border-red-500"
									value={shippingCity}
									onChange={(e) => {
										setShippingCity(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
							</div>
							<div className="flex">
								<label htmlFor="">State</label>
								<input
									type="text"
									name="shippingState"
									id="shippingState"
									className="border border-red-500"
									value={shippingState}
									onChange={(e) => {
										setShippingState(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
								<label htmlFor="">Zip Code</label>
								<input
									type="text"
									name="shippingZipCode"
									id="shippingZipCode"
									className="border border-red-500"
									value={shippingZipCode}
									onChange={(e) => {
										setShippingZipCode(e.target.value);
										onChangeAddressHandler(e);
									}}
								/>
							</div>
						</div>
					)}
					{/* shipping address form end */}

					{/* new address form */}
					{newAddressRadio && (
						<div>
							<div className="flex">
								<label htmlFor="">Address</label>
								<input
									type="text"
									name="newAddress"
									id="newAddress"
									className="border border-red-500"
									value={newAddress}
									onChange={(e) => setNewAddress(e.target.value)}
								/>
								<label htmlFor="">Town/City</label>
								<input
									type="text"
									name="newCity"
									id="newCity"
									className="border border-red-500"
									value={newCity}
									onChange={(e) => setNewCity(e.target.value)}
								/>
							</div>
							<div className="flex">
								<label htmlFor="">State</label>
								<input
									type="text"
									name="newState"
									id="newState"
									className="border border-red-500"
									value={newState}
									onChange={(e) => setNewState(e.target.value)}
								/>
								<label htmlFor="">Zip Code</label>
								<input
									type="text"
									name="newZipCode"
									id="newZipCode"
									className="border border-red-500"
									value={newZipCode}
									onChange={(e) => setNewZipCode(e.target.value)}
								/>
							</div>
						</div>
					)}
					{/* new address form end */}
					{isChangedAddresses && isLoggedIn && (
						<div className="flex">
							<input
								type="checkbox"
								name="updateAddresses"
								id="updateAddresses"
								checked={updateAddressesCheck}
								onChange={(e) => setUpdateAddressesCheck(e.target.checked)}
							/>
							<label htmlFor="">Update Changed Address in your Profile</label>
						</div>
					)}
					<hr />
					<h2>Payment</h2>
					<div className="flex">
						<input type="radio" />
						<label htmlFor="">Cash on Delivery</label>
						<input type="radio" />
						<label htmlFor="">Debit/Credit Card</label>
						<input type="radio" />
						<label htmlFor="">Paypal</label>
						<input type="radio" />
						<label htmlFor="">Stripe</label>
					</div>
					<button type="submit">Complete Order</button>
				</form>
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
		</div>
	);
};

export default Checkout;
