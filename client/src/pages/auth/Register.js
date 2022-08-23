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
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const { firstName, lastName, email, password, confirmPassword } = formData;
	const dispatch = useDispatch();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(register(formData));
	};
	return (
		<section>
			<form onSubmit={submitHandler}>
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
