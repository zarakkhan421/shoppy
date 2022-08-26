import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getIsLoading,
	getUserId,
	getfirstName,
	getlastName,
	getUserRole,
	register,
} from "../../features/userSlice";

const Register = () => {
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const getStatefirstName = useSelector(getfirstName);
	const getStatelastName = useSelector(getlastName);
	const isLoading = useSelector(getIsLoading);
	const [provideAdresses, setProvideAddresses] = useState(false);
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		phoneNumber: "",
		homeAddress: "",
		homeState: "",
		homeCity: "",
		homeZipCode: "",
		shippingAddress: "",
		shippingState: "",
		shippingCity: "",
		shippingZipCode: "",
	});
	const {
		firstName,
		lastName,
		email,
		password,
		confirmPassword,
		phoneNumber,
		homeAddress,
		homeState,
		homeCity,
		homeZipCode,
		shippingAddress,
		shippingState,
		shippingCity,
		shippingZipCode,
	} = formData;
	const dispatch = useDispatch();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		const data = {
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			phoneNumber,
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
		dispatch(register(data));
	};
	return (
		<section>
			<form onSubmit={submitHandler}>
				<div>
					<label htmlFor="">First Name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						value={firstName}
						onChange={onChange}
					/>
					<label htmlFor="">Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						value={lastName}
						onChange={onChange}
					/>
					<label htmlFor="">Phone Number</label>
					<input
						type="text"
						name="phoneNumber"
						id="phoneNumber"
						className="border border-red-300"
						value={phoneNumber}
						onChange={onChange}
					/>
					<label htmlFor="">Email</label>
					<input
						type="text"
						name="email"
						id="email"
						value={email}
						onChange={onChange}
					/>
					<label htmlFor="">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={password}
						onChange={onChange}
					/>
					<label htmlFor="">Confim Password</label>
					<input
						type="password"
						name="confirmPassword"
						id="confirm-password"
						value={confirmPassword}
						onChange={onChange}
					/>
				</div>
				{provideAdresses && (
					<>
						{" "}
						<div>
							<h2>Address</h2>
							<h2>Home</h2>
							<label htmlFor="">Address</label>
							<input
								type="text"
								name="homeAddress"
								id="homeAddress"
								className="border border-red-300"
								value={homeAddress}
								onChange={onChange}
							/>
							<label htmlFor="">State</label>
							<input
								type="text"
								name="homeState"
								id="homeState"
								className="border border-red-300"
								value={homeState}
								onChange={onChange}
							/>
							<label htmlFor="">City</label>
							<input
								type="text"
								name="homeCity"
								id="homeCity"
								className="border border-red-300"
								value={homeCity}
								onChange={onChange}
							/>
							<label htmlFor="">Zip Code</label>
							<input
								type="text"
								name="homeZipCode"
								id="homeZipCode"
								className="border border-red-300"
								value={homeZipCode}
								onChange={onChange}
							/>
						</div>
						<hr />
						<div>
							<h2>Shipping</h2>
							<label htmlFor="">Address</label>
							<input
								type="text"
								name="shippingAddress"
								id="shippingAddress"
								className="border border-red-300"
								value={shippingAddress}
								onChange={onChange}
							/>
							<label htmlFor="">State</label>
							<input
								type="text"
								name="shippingState"
								id="shippingState"
								className="border border-red-300"
								value={shippingState}
								onChange={onChange}
							/>
							<label htmlFor="">City</label>
							<input
								type="text"
								name="shippingCity"
								id="shippingCity"
								className="border border-red-300"
								value={shippingCity}
								onChange={onChange}
							/>
							<label htmlFor="">Zip Code</label>
							<input
								type="text"
								name="shippingZipCode"
								id="shippingZipCode"
								className="border border-red-300"
								value={shippingZipCode}
								onChange={onChange}
							/>
						</div>
					</>
				)}
				<div>
					<input
						type="checkbox"
						checked={provideAdresses}
						onChange={(e) => setProvideAddresses(e.target.checked)}
					/>
					<label htmlFor="">I will provide addresses now</label>
				</div>
				<button type="submit">Register</button>
			</form>
			<span>{userId ? userId : ""}</span>
			<span>
				{getStatefirstName && getStatelastName
					? getStatefirstName + " " + getStatelastName
					: ""}
			</span>
			<span>{userRole ? userRole : ""}</span>
			<span>{isLoading && "isLoading"}</span>
		</section>
	);
};

export default Register;
