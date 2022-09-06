import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ChangeRole = () => {
	const [role, setRole] = useState("");
	const { email } = useParams();
	console.log(email);
	const axiosPrivateInstance = useAxiosPrivate();
	const roleHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosPrivateInstance.put("/user/update-role", {
				role,
				email,
			});
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<h2 className="text-4xl font-bold my-2">Change Role</h2>
			<form onSubmit={roleHandler}>
				<div className="flex flex-col  w-full mb-3">
					<label htmlFor="" className="text-xl">
						Select Status:
					</label>
					<select
						name="status"
						id="status"
						value={role}
						onChange={(e) => setRole(e.target.value)}
						className="border border-gray-2 rounded w:full outline-gray-1 h-8"
					>
						<option>Choose Role</option>
						<option value="admin">Admin</option>
						<option value="editor">Editor</option>
						<option value="user">User</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
				>
					Change Status
				</button>
			</form>
		</div>
	);
};

export default ChangeRole;
