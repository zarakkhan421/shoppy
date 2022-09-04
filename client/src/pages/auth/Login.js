import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	getUserId,
	getUserRole,
	getfirstName,
	getlastName,
	login,
	getIsLoading,
	getIsLoggedIn,
	getIsSuccess,
	getMessage,
} from "../../features/userSlice";
import validate from "../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
const Login = () => {
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const isLoading = useSelector(getIsLoading);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isSuccess = useSelector(getIsSuccess);
	const message = useSelector(getMessage);
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	// errors
	const [formErrors, setFormErrors] = useState({
		emailErrors: [],
		passwordErrors: [],
	});
	const { emailErrors, passwordErrors } = formErrors;
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

		const dataToValidate = [
			{
				name: "Email",
				validate: ["required", "string", "email"],
				value: email,
			},
			{
				name: "Password",
				validate: ["required", "string", "min:8"],
				value: password,
			},
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			emailErrors: validateErrors[0],
			passwordErrors: validateErrors[1],
		});
		if (validateErrors.flat().length > 0) return;
		dispatch(login(formData));
		console.log("dispatch login");
		if (!isSuccess && !isLoading) {
			toast.error(message);
		}
		if (isLoggedIn) {
			navigate("/");
		}
	};

	return (
		<section>
			<form onSubmit={submitHandler}>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-x-5 place-items-center">
					<div className="col-span-2 text-4xl font-bold my-2 w-full">Login</div>
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
					<div className="col-span-2 w-full">
						<button
							type="submit"
							className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
						>
							Login
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

export default Login;
