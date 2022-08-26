import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserId } from "../../../features/userSlice";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const EditProfile = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const userId = useSelector(getUserId);
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
		};
		try {
			const response = await axiosPrivateInstance.put("/user", data);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<form onSubmit={profileUpdateHandler}>
				<div>
					<h2>Edit Profile</h2>
					<label htmlFor="">First Name</label>
					<input
						type="text"
						name="firstName"
						id="firstName"
						className="border border-red-300"
						value={firstName}
						onChange={onChange}
					/>
					<label htmlFor="">Last Name</label>
					<input
						type="text"
						name="lastName"
						id="lastName"
						className="border border-red-300"
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
				</div>
				<hr />
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
				<button type="submit">Update Profile</button>
			</form>
		</div>
	);
};

export default EditProfile;
