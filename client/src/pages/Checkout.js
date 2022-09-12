import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useLocalStorage } from "../hooks/useLocalStorage";
import orderSummary from "../utils/orderSummary";
import {
	getIsLoggedIn,
	getUserId,
	resetReduxCart,
} from "../features/userSlice";
import { useSelector, useDispatch } from "react-redux";
import useAxios from "../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import validate from "../utils/validate";
const Checkout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { getCart, resetCart } = useLocalStorage();
	const [checkoutDetails, setCheckoutDetails] = useState({});
	const [isChangedAddresses, setIsChangedAddresses] = useState(false);

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [email, setEmail] = useState("");

	const [homeAddressRadio, setHomeAddressRadio] = useState(false);
	const [shippingAddressRadio, setShippingAddressRadio] = useState(false);
	const [newAddressRadio, setNewAddressRadio] = useState(true);

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

	// errors
	const [formErrors, setFormErrors] = useState({
		firstNameErrors: [],
		lastNameErrors: [],
		phoneNumberErrors: [],
		emailErrors: [],
		homeAddressErrors: [],
		homeStateErrors: [],
		homeCityErrors: [],
		homeZipCodeErrors: [],
		shippingAddressErrors: [],
		shippingStateErrors: [],
		shippingCityErrors: [],
		shippingZipCodeErrors: [],
		newAddressErrors: [],
		newStateErrors: [],
		newCityErrors: [],
		newZipCodeErrors: [],
	});
	const {
		firstNameErrors,
		lastNameErrors,
		phoneNumberErrors,
		emailErrors,

		homeAddressErrors,
		homeStateErrors,
		homeCityErrors,
		homeZipCodeErrors,
		shippingAddressErrors,
		shippingStateErrors,
		shippingCityErrors,
		shippingZipCodeErrors,
		newAddressErrors,
		newStateErrors,
		newCityErrors,
		newZipCodeErrors,
	} = formErrors;

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

		const dataToValidate = [
			{
				name: "First Name",
				value: firstName,
				validate: ["string", "min:3", "required", "max:15"],
			},
			{
				name: "Last Name",
				value: lastName,
				validate: ["required", "string", "min:3", "max:15"],
			},
			{
				name: "Phone Number",
				value: phoneNumber,
				validate: ["required", "string"],
			},
			{
				name: "Email",
				value: email,
				validate: ["required", "string", "email"],
			},
		];
		const validateHomeAddresses = [
			{
				name: "Home Address",
				value: homeAddress,
				validate: ["string", "required"],
			},
			{
				name: "Home State",
				value: homeState,
				validate: ["string", "required"],
			},
			{
				name: "Home City",
				value: homeCity,
				validate: ["string", "required"],
			},
			{
				name: "Home Zip Code",
				value: homeZipCode,
				validate: ["number", "required"],
			},
		];
		const validateShippingAddresses = [
			{
				name: "Shipping Address",
				value: shippingAddress,
				validate: ["string", "required"],
			},
			{
				name: "Shipping State",
				value: shippingState,
				validate: ["string", "required"],
			},
			{
				name: "Shipping City",
				value: shippingCity,
				validate: ["string", "required"],
			},
			{
				name: "Shipping Zip Code",
				value: shippingZipCode,
				validate: ["number", "required"],
			},
		];
		const validateNewAddresses = [
			{
				name: "New Address",
				value: newAddress,
				validate: ["string", "required"],
			},
			{
				name: "New State",
				value: newState,
				validate: ["string", "required"],
			},
			{
				name: "New City",
				value: newCity,
				validate: ["string", "required"],
			},
			{
				name: "New Zip Code",
				value: newZipCode,
				validate: ["number", "required"],
			},
		];
		let validateErrors;
		if (homeAddressRadio) {
			validateErrors = validate([...dataToValidate, ...validateHomeAddresses]);
		}
		if (shippingAddressRadio) {
			validateErrors = validate([
				...dataToValidate,
				...validateShippingAddresses,
			]);
		}
		if (newAddressRadio) {
			validateErrors = validate([...dataToValidate, ...validateNewAddresses]);
		}
		setFormErrors({
			firstNameErrors: validateErrors[0],
			lastNameErrors: validateErrors[1],
			phoneNumberErrors: validateErrors[2],
			emailErrors: validateErrors[3],
			homeAddressErrors: homeAddressRadio ? validateErrors[4] : [],
			homeStateErrors: homeAddressRadio ? validateErrors[5] : [],
			homeCityErrors: homeAddressRadio ? validateErrors[6] : [],
			homeZipCodeErrors: homeAddressRadio ? validateErrors[7] : [],
			shippingAddressErrors: shippingAddressRadio ? validateErrors[4] : [],
			shippingStateErrors: shippingAddressRadio ? validateErrors[5] : [],
			shippingCityErrors: shippingAddressRadio ? validateErrors[6] : [],
			shippingZipCodeErrors: shippingAddressRadio ? validateErrors[7] : [],
			newAddressErrors: newAddressRadio ? validateErrors[4] : [],
			newStateErrors: newAddressRadio ? validateErrors[5] : [],
			newCityErrors: newAddressRadio ? validateErrors[6] : [],
			newZipCodeErrors: newAddressRadio ? validateErrors[7] : [],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}

		const cart = getCart();
		console.log("cart", cart);
		const customerDetails = {
			firstName,
			lastName,
			email,
			phoneNumber,
		};
		const orderItemsData = cart.map((cartItem) => ({
			name: cartItem.name,
			price: cartItem.price,
			quantity: cartItem.quantity ? cartItem.quantity : 1,
			sale: cartItem.sale ? cartItem.sale : 0,
			product: cartItem._id,
			user: userId,
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
			orderItemsData,
			user: userId,
		};

		try {
			const response = await axiosInstance.post("/orders", order);
			console.log(response);
			navigate("/");
			if (response.data.success) {
				resetCart();
				dispatch(resetReduxCart());
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
		console.log("order items", orderItemsData);
		console.log("customer details", customerDetails);
	};

	return (
		<div className="flex justify-between">
			<div>
				<form onSubmit={submitOrderHandler}>
					<div className="grid grid-cols-2 gap-x-5 place-items-center">
						<h2 className="col-span-2 text-3xl font-medium w-full">
							Personal Information
						</h2>
						<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
							<label htmlFor="" className="text-xl">
								First Name
							</label>
							<input
								type="text"
								name="firstName"
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
									firstNameErrors.length > 0 && "border-rose-500 border-2"
								}`}
							/>
							{firstNameErrors.map((err, i) => {
								return (
									<span className="text-rose-500" key={i}>
										{err}
									</span>
								);
							})}
						</div>
						<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
							<label htmlFor="">Last Name</label>
							<input
								type="text"
								name="lastName"
								id="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
									lastNameErrors.length > 0 && "border-rose-500 border-2"
								}`}
							/>
							{lastNameErrors.map((err, i) => {
								return (
									<span className="text-rose-500" key={i}>
										{err}
									</span>
								);
							})}
						</div>
						<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
							<label htmlFor="">Phone</label>
							<input
								type="text"
								name="phoneNumber"
								id="phoneNumber"
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
									phoneNumberErrors.length > 0 && "border-rose-500 border-2"
								}`}
							/>
							{phoneNumberErrors.map((err, i) => {
								return (
									<span className="text-rose-500" key={i}>
										{err}
									</span>
								);
							})}
						</div>
						<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
							<label htmlFor="">Email</label>
							<input
								type="text"
								name="email"
								id="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
									emailErrors.length > 0 && "border-rose-500 border-2"
								}`}
							/>
							{emailErrors.map((err, i) => {
								return (
									<span className="text-rose-500" key={i}>
										{err}
									</span>
								);
							})}{" "}
						</div>
						<h2 className="col-span-2 text-2xl w-full">Delivery Details</h2>
						{/* radios */}
						<div className="col-span-2 w-full flex ">
							{isLoggedIn && (
								<>
									<div className="flex mr-2">
										<input
											type="radio"
											name="homeAddressRadio"
											checked={homeAddressRadio}
											onChange={onChangeAddressHandler}
											className="mr-1"
										/>
										<label htmlFor="">Same as Home Address</label>
									</div>
									<div className="flex mr-2">
										<input
											type="radio"
											name="shippingAddressRadio"
											checked={shippingAddressRadio}
											onChange={onChangeAddressHandler}
											className="mr-1"
										/>
										<label htmlFor="">Same as Shipping Address</label>
									</div>
								</>
							)}

							{isLoggedIn ? (
								<>
									<div className="flex mr-2">
										<input
											type="radio"
											name="newAddressRadio"
											checked={newAddressRadio}
											onChange={onChangeAddressHandler}
											className="mr-1"
										/>
										<label htmlFor="">Enter New Delivery Address</label>
									</div>
								</>
							) : (
								<div className="flex flex-col">
									<label htmlFor="">Enter Delivery Address</label>
								</div>
							)}
						</div>
						{/* radios end */}
						{/* home address form */}
						{homeAddressRadio && (
							<>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Address</label>
									<input
										type="text"
										name="homeAddress"
										id="homeAddress"
										value={homeAddress}
										onChange={(e) => {
											setHomeAddress(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											homeAddressErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{homeAddressErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Town/City</label>
									<input
										type="text"
										name="homeCity"
										id="homeCity"
										value={homeCity}
										onChange={(e) => {
											setHomeCity(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											homeCityErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{homeCityErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">State</label>
									<input
										type="text"
										name="homeState"
										id="homeState"
										value={homeState}
										onChange={(e) => {
											setHomeState(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											homeStateErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{homeStateErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Zip Code</label>
									<input
										type="text"
										name="homeZipCode"
										id="homeZipCode"
										value={homeZipCode}
										onChange={(e) => {
											setHomeZipCode(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											homeZipCodeErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{homeZipCodeErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
							</>
						)}
						{/* home address form end */}
						{/* shipping address form */}
						{shippingAddressRadio && (
							<>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Address</label>
									<input
										type="text"
										name="shippingAddress"
										id="shippingAddress"
										value={shippingAddress}
										onChange={(e) => {
											setShippingAddress(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											shippingAddressErrors.length > 0 &&
											"border-rose-500 border-2"
										}`}
									/>
									{shippingAddressErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Town/City</label>
									<input
										type="text"
										name="shippingCity"
										id="shippingCity"
										value={shippingCity}
										onChange={(e) => {
											setShippingCity(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											shippingCityErrors.length > 0 &&
											"border-rose-500 border-2"
										}`}
									/>
									{shippingCityErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">State</label>
									<input
										type="text"
										name="shippingState"
										id="shippingState"
										value={shippingState}
										onChange={(e) => {
											setShippingState(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											shippingStateErrors.length > 0 &&
											"border-rose-500 border-2"
										}`}
									/>
									{shippingStateErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Zip Code</label>
									<input
										type="text"
										name="shippingZipCode"
										id="shippingZipCode"
										value={shippingZipCode}
										onChange={(e) => {
											setShippingZipCode(e.target.value);
											onChangeAddressHandler(e);
										}}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											shippingZipCodeErrors.length > 0 &&
											"border-rose-500 border-2"
										}`}
									/>
									{shippingZipCodeErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
							</>
						)}
						{/* shipping address form end */}
						{/* new address form */}
						{newAddressRadio && (
							<>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="" className="text-xl">
										Address
									</label>
									<input
										type="text"
										name="newAddress"
										id="newAddress"
										value={newAddress}
										onChange={(e) => setNewAddress(e.target.value)}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											newAddressErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{newAddressErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Town/City</label>
									<input
										type="text"
										name="newCity"
										id="newCity"
										value={newCity}
										onChange={(e) => setNewCity(e.target.value)}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											newCityErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{newCityErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">State</label>
									<input
										type="text"
										name="newState"
										id="newState"
										value={newState}
										onChange={(e) => setNewState(e.target.value)}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											newStateErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{newStateErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
								<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
									<label htmlFor="">Zip Code</label>
									<input
										type="text"
										name="newZipCode"
										id="newZipCode"
										value={newZipCode}
										onChange={(e) => setNewZipCode(e.target.value)}
										className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
											newZipCodeErrors.length > 0 && "border-rose-500 border-2"
										}`}
									/>
									{newZipCodeErrors.map((err, i) => {
										return (
											<span className="text-rose-500" key={i}>
												{err}
											</span>
										);
									})}
								</div>
							</>
						)}
						{/* new address form end */}
						{isChangedAddresses && isLoggedIn && (
							<div className="flex col-span-2 w-full mb-3">
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
						<h2 className="col-span-2 text-2xl w-full">Payment</h2>
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
						<div className="col-span-2 w-full">
							<button
								type="submit"
								className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
							>
								Complete Order
							</button>
						</div>
					</div>
				</form>
			</div>

			{/* <div>
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
			</div> */}
			<div className="flex flex-col items-start px-5 py-9 w-1/3 shadow-md h-[275px]">
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
			</div>
		</div>
	);
};

export default Checkout;
