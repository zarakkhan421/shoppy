import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getUserId,
	getUserRole,
	getfirstName,
	getlastName,
	login,
	getIsLoading,
} from "../../features/userSlice";

const Login = () => {
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const firstName = useSelector(getfirstName);
	const lastName = useSelector(getlastName);
	const isLoading = useSelector(getIsLoading);
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const { email, password } = formData;
	const dispatch = useDispatch();
	const onChange = (e) => {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	};
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(login(formData));
	};

	return (
		<section>
			<form onSubmit={submitHandler}>
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
				<button type="submit">Login</button>
			</form>
			<span>{firstName && lastName ? firstName + " " + lastName : ""}</span>
			<span>{userRole ? userRole : ""}</span>
			<span>{isLoading && "isLoading"}</span>
			{userId ? <span>{userId}</span> : "noid"}
		</section>
	);
};

export default Login;
