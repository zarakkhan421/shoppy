import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getIsLoading,
	getUserId,
	getfirstName,
	getlastName,
	getUserRole,
	register,
	getIsLoggedIn,
	getIsSuccess,
	getMessage,
} from "../../features/userSlice";
import validate from "../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const isLoading = useSelector(getIsLoading);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isSuccess = useSelector(getIsSuccess);
	const message = useSelector(getMessage);

	const navigate = useNavigate();
	//states
	const [provideAdresses, setProvideAddresses] = useState(false);
	// errors
	const [formErrors, setFormErrors] = useState({
		firstNameErrors: [],
		lastNameErrors: [],
		emailErrors: [],
		passwordErrors: [],
		confirmPasswordErrors: [],
		phoneNumberErrors: [],
		imageErrors: [],
	});
	const {
		firstNameErrors,
		lastNameErrors,
		emailErrors,
		passwordErrors,
		confirmPasswordErrors,
		phoneNumberErrors,
		imageErrors,
	} = formErrors;
	// image
	const [image, setImage] = useState("");
	const [imageBase64, setImageBase64] = useState("");

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

		// console.log(typeof firstName);
		// console.log(isNaN(Number(phoneNumber)));
		const dataToValidate = [
			{
				name: "First Name",
				value: firstName,
				validate: ["string", "min:3", "required", "max:15"],
			},
			{
				name: "Last Name",
				value: lastName,
				validate: ["required", "string", "max:15", "min:3"],
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
			{
				name: "Password",
				value: password,
				validate: ["required", "string", "min:8"],
			},
			{
				name: "Confirm Password",
				value: [confirmPassword, password],
				validate: ["required", "string", "match", "min:8"],
			},
			{
				name: "Image",
				value: imageBase64,
				validate: ["required", "string"],
			},
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			firstNameErrors: validateErrors[0],
			lastNameErrors: validateErrors[1],
			phoneNumberErrors: validateErrors[2],
			emailErrors: validateErrors[3],
			passwordErrors: validateErrors[4],
			confirmPasswordErrors: validateErrors[5],
			imageErrors: validateErrors[6],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}
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
			image: imageBase64,
		};
		dispatch(register(data));
		if (!isSuccess && isLoading) {
			toast.error(message);
		}
		if (isLoggedIn && !isLoading) {
			navigate("/");
		}
	};

	const handleImage = (e) => {
		setImage(e.target.value);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onloadend = () => {
			setImageBase64(reader.result);
		};
	};

	return (
		<section>
			<form onSubmit={submitHandler}>
				<div className="grid grid-cols-2 gap-x-5 place-items-center">
					<div className="col-span-2 text-4xl font-bold my-2 w-full">
						Register
					</div>
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							First Name
						</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							value={firstName}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							Last Name
						</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							value={lastName}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							Phone Number
						</label>
						<input
							type="text"
							name="phoneNumber"
							id="phoneNumber"
							value={phoneNumber}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							Email
						</label>
						<input
							type="text"
							name="email"
							id="email"
							value={email}
							onChange={onChange}
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
						})}
					</div>
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								passwordErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{passwordErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Confirm Password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirm-password"
							value={confirmPassword}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								confirmPasswordErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{confirmPasswordErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					{provideAdresses && (
						<>
							<div className="col-span-2 border-b-2 border-gray-2 border-dotted my-6 w-full"></div>
							<h2 className="col-span-2 text-3xl font-medium w-full">
								Address
							</h2>
							<h2 className="col-span-2 text-2xl w-full">Home</h2>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									Address
								</label>
								<input
									type="text"
									name="homeAddress"
									id="homeAddress"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={homeAddress}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									State
								</label>
								<input
									type="text"
									name="homeState"
									id="homeState"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={homeState}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									City
								</label>
								<input
									type="text"
									name="homeCity"
									id="homeCity"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={homeCity}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									Zip Code
								</label>
								<input
									type="text"
									name="homeZipCode"
									id="homeZipCode"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={homeZipCode}
									onChange={onChange}
								/>
							</div>
							<div className="col-span-2 border-b-2 border-gray-2 border-dotted w-2/3 my-6"></div>
							<h2 className="col-span-2 text-2xl w-full">Shipping</h2>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									Address
								</label>
								<input
									type="text"
									name="shippingAddress"
									id="shippingAddress"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={shippingAddress}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									State
								</label>
								<input
									type="text"
									name="shippingState"
									id="shippingState"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={shippingState}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									City
								</label>
								<input
									type="text"
									name="shippingCity"
									id="shippingCity"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={shippingCity}
									onChange={onChange}
								/>
							</div>
							<div className="flex flex-col col-span-2 lg:col-span-1 w-full">
								<label htmlFor="" className="text-xl">
									Zip Code
								</label>
								<input
									type="text"
									name="shippingZipCode"
									id="shippingZipCode"
									className="border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8"
									value={shippingZipCode}
									onChange={onChange}
								/>
							</div>
						</>
					)}
					<div className="col-span-2 w-full">
						<input
							type="checkbox"
							checked={provideAdresses}
							onChange={(e) => setProvideAddresses(e.target.checked)}
							className="mr-2 self-start"
						/>
						<label htmlFor="">I will provide addresses now</label>
					</div>
					<div className="col-span-2 w-full">
						{imageBase64.length > 0 && (
							<img
								src={imageBase64}
								alt="avatar"
								style={{ width: "500px", height: "auto" }}
							/>
						)}
					</div>
					<div className="col-span-2 w-full">
						<input
							type="file"
							name="image"
							id="image"
							value={image}
							onChange={handleImage}
							className="block w-full text-md text-gray-1
      									file:mr-4 file:py-2 file:px-4
      									file:rounded file:border-slate-200
      									file:text-sm file:font-semibold shadow-none hover:file:bg-slate-300
     									 file:bg-slate-200 file:text-gray-1"
						/>
						{imageErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="col-span-2 w-full">
						<button
							className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
							type="submit"
						>
							Register
						</button>
					</div>
				</div>
				<ToastContainer
					position="bottom-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</form>
		</section>
	);
};

export default Register;
