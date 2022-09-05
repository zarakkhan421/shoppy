import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import validate from "../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ResetPassword = () => {
	const { reset_token } = useParams();
	const axiosInstance = useAxios();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState(""); // errors
	const [formErrors, setFormErrors] = useState({
		passwordErrors: [],
		confirmPasswordErrors: [],
	});
	const { passwordErrors, confirmPasswordErrors } = formErrors;
	const resetPassword = async (e) => {
		e.preventDefault();
		const dataToValidate = [
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
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			passwordErrors: validateErrors[0],
			confirmPasswordErrors: validateErrors[1],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}
		const resetBody = {
			password,
			confirmPassword,
		};
		try {
			const response = axiosInstance.post(
				`/user/reset-password/${reset_token}`,
				resetBody
			);
			toast.promise(response, {
				pending: "Resetting Password, Please wait...",
				success: "Reset successful",
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
				Reset Password
			</h2>
			<form onSubmit={resetPassword}>
				<div className="grid grid-cols-2 gap-x-5 place-items-center">
					<div className="flex flex-col col-span-2 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Password
						</label>
						<input
							type="password"
							name="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
							id="confirmPassword"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
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
					<div className="col-span-2 w-full">
						<button
							className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
							type="submit"
						>
							Reset Password
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

export default ResetPassword;
