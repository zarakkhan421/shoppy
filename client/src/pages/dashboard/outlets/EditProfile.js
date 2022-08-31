import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RenderImage from "../../../components/common/RenderImage";
import { getUserId } from "../../../features/userSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import validate from "../../../utils/validate";

const EditProfile = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	// image
	const [selectedImage, setSelectedImage] = useState("");
	const [imageBase64, setImageBase64] = useState("");
	// errors
	const [formErrors, setFormErrors] = useState({
		firstNameErrors: [],
		lastNameErrors: [],
		phoneNumberErrors: [],
		homeAddressErrors: [],
		homeStateErrors: [],
		homeCityErrors: [],
		homeZipCodeErrors: [],
		shippingAddressErrors: [],
		shippingStateErrors: [],
		shippingCityErrors: [],
		shippingZipCodeErrors: [],
	});
	const {
		firstNameErrors,
		lastNameErrors,
		phoneNumberErrors,
		homeAddressErrors,
		homeStateErrors,
		homeCityErrors,
		homeZipCodeErrors,
		shippingAddressErrors,
		shippingStateErrors,
		shippingCityErrors,
		shippingZipCodeErrors,
	} = formErrors;
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
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
		phoneNumber,
		homeAddress,
		homeState,
		homeCity,
		homeZipCode,
		shippingAddress,
		shippingState,
		shippingCity,
		shippingZipCode,
		image,
	} = formData;
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	useEffect(() => {
		const getUserProfile = async () => {
			try {
				const response = await axiosPrivateInstance.get(`/user`);
				console.log(response);
				const user = response?.data.serverData.user;
				setFormData({
					firstName: user.firstName,
					lastName: user.lastName,
					phoneNumber: user.phoneNumber,
					homeAddress: user.addresses.homeAddress.address,
					homeState: user.addresses.homeAddress.state,
					homeCity: user.addresses.homeAddress.city,
					homeZipCode: user.addresses.homeAddress.zipCode,
					shippingAddress: user.addresses.shippingAddress.address,
					shippingState: user.addresses.shippingAddress.state,
					shippingCity: user.addresses.shippingAddress.city,
					shippingZipCode: user.addresses.shippingAddress.zipCode,
					image: user.image,
				});
				console.log(formData);
			} catch (error) {
				console.log(error);
			}
		};
		getUserProfile();
	}, []);
	const profileUpdateHandler = async (e) => {
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
				name: "Home Address",
				value: homeAddress,
				validate: ["string"],
			},
			{
				name: "Home State",
				value: homeState,
				validate: ["string"],
			},
			{
				name: "Home City",
				value: homeCity,
				validate: ["string"],
			},
			{
				name: "Home Zip Code",
				value: homeZipCode,
				validate: ["number"],
			},
			{
				name: "Shipping Address",
				value: shippingAddress,
				validate: ["string"],
			},
			{
				name: "Shipping State",
				value: shippingState,
				validate: ["string"],
			},
			{
				name: "Shipping City",
				value: shippingCity,
				validate: ["string"],
			},
			{
				name: "Shipping Zip Code",
				value: shippingZipCode,
				validate: ["number"],
			},
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			firstNameErrors: validateErrors[0],
			lastNameErrors: validateErrors[1],
			phoneNumberErrors: validateErrors[2],
			homeAddressErrors: validateErrors[3],
			homeStateErrors: validateErrors[4],
			homeCityErrors: validateErrors[5],
			homeZipCodeErrors: validateErrors[6],
			shippingAddressErrors: validateErrors[7],
			shippingStateErrors: validateErrors[8],
			shippingCityErrors: validateErrors[9],
			shippingZipCodeErrors: validateErrors[10],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}
		const data = {
			firstName,
			lastName,
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
		try {
			const response = await axiosPrivateInstance.put("/user", data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	const handleImage = (e) => {
		setSelectedImage(e.target.value);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onloadend = () => {
			setImageBase64(reader.result);
		};
	};
	return (
		<div>
			<form onSubmit={profileUpdateHandler}>
				<div className="grid grid-cols-2 gap-x-5 place-items-center">
					<h2 className="col-span-2 text-4xl font-bold my-2 w-full">
						Edit Profile
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
					<h2 className="col-span-2 text-3xl font-medium w-full">Address</h2>
					<h2 className="col-span-2 text-2xl w-full">Home</h2>
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Address
						</label>
						<input
							type="text"
							name="homeAddress"
							id="homeAddress"
							value={homeAddress}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							State
						</label>
						<input
							type="text"
							name="homeState"
							id="homeState"
							value={homeState}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							City
						</label>
						<input
							type="text"
							name="homeCity"
							id="homeCity"
							value={homeCity}
							onChange={onChange}
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
						<label htmlFor="" className="text-xl">
							Zip Code
						</label>
						<input
							type="text"
							name="homeZipCode"
							id="homeZipCode"
							value={homeZipCode}
							onChange={onChange}
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
					<h2 className="col-span-2 text-2xl w-full">Shipping</h2>
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Address
						</label>
						<input
							type="text"
							name="shippingAddress"
							id="shippingAddress"
							value={shippingAddress}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								shippingAddressErrors.length > 0 && "border-rose-500 border-2"
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
						<label htmlFor="" className="text-xl">
							State
						</label>
						<input
							type="text"
							name="shippingState"
							id="shippingState"
							value={shippingState}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								shippingStateErrors.length > 0 && "border-rose-500 border-2"
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
						<label htmlFor="" className="text-xl">
							City
						</label>
						<input
							type="text"
							name="shippingCity"
							id="shippingCity"
							value={shippingCity}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								shippingCityErrors.length > 0 && "border-rose-500 border-2"
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
						<label htmlFor="" className="text-xl">
							Zip Code
						</label>
						<input
							type="text"
							name="shippingZipCode"
							id="shippingZipCode"
							value={shippingZipCode}
							onChange={onChange}
							className={`border border-gray-2 rounded lg:w-4/5 w:full outline-gray-1 h-8 ${
								shippingZipCodeErrors.length > 0 && "border-rose-500 border-2"
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
					<div className="flex flex-col col-span-2 w-full mb-3">
						<RenderImage image={image} imageBase64={imageBase64} />
					</div>
					<div className="flex flex-col col-span-2 w-full mb-3">
						<input
							type="file"
							name="image"
							id="image"
							value={selectedImage}
							onChange={handleImage}
						/>
					</div>
					<div className="col-span-2 w-full">
						<button
							type="submit"
							className=" bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
						>
							Update Profile
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default EditProfile;
