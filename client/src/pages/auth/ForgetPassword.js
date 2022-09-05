import React, { useState } from "react";
import useAxios from "../../hooks/useAxios";
import validate from "../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ForgetPassword = () => {
	const axiosInstance = useAxios();
	const [email, setEmail] = useState(""); // errors
	const [formErrors, setFormErrors] = useState({
		emailErrors: [],
	});
	const { emailErrors } = formErrors;
	const forgetPassword = async (e) => {
		e.preventDefault();
		const dataToValidate = [
			{
				name: "Email",
				value: email,
				validate: ["required", "string", "email"],
			},
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			emailErrors: validateErrors[0],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}
		try {
			const response = axiosInstance.post("/user/forget-password", {
				email,
			});
			toast.promise(response, {
				pending: "Sending Email, Please wait...",
				success: "Email sent.",
			});
			const resolved = await response;
			console.log(resolved);
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};
	return (
		<section>
			<h2 className="col-span-2 text-4xl font-bold my-2 w-full">
				Forget Password
			</h2>
			<div className="font-medium mb-2">
				Enter your email and you will get a reset link in email
			</div>
			<form onSubmit={forgetPassword}>
				<div className="grid grid-cols-2 gap-x-5 place-items-center">
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Email
						</label>
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
						})}
					</div>
					<div className="col-span-2 w-full">
						<button
							className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
							type="submit"
						>
							Send Email
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

export default ForgetPassword;
