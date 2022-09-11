import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const ManageUsers = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [users, setUsers] = useState([]);
	useEffect(() => {
		const getUsers = async () => {
			const response = await axiosPrivateInstance.get("user/all");
			console.log(response);
			setUsers(response.data.serverData.users);
		};
		getUsers();
	}, []);
	const deleteUser = async (e) => {
		e.preventDefault();
		try {
			console.log(e.target.userId.value);
			const response = await axiosPrivateInstance.delete(
				`/user/${e.target.userId.value}`
			);
			console.log(response);
			setUsers(users.filter((user) => user._id !== e.target.userId.value));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<h2 className="text-4xl font-bold my-2 w-full">Manage Users</h2>
			<table className="table-fixed border-collapse w-full border border-orange">
				{/* <Outlet /> */}
				<thead className="">
					<tr className="bg-primary">
						<th className="border text-white font-semibold">Name</th>
						<th className="border text-white font-semibold">Image</th>
						<th className="border text-white font-semibold">Role</th>
						<th className="border text-white font-semibold">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users &&
						users.map((user) => {
							return (
								<tr key={user._id}>
									<>
										<td className="border text-center">
											{user.firstName + " " + user.lastName}
										</td>
										<td className="border text-center flex justify-center">
											<img
												src={user.image.url}
												className="h-10 w-10 p-auto text-center object-scale-down"
												alt=""
											/>
										</td>
										<td className="border text-center">
											{user.role[0].toUpperCase() + user.role.slice(1)}
										</td>
										<td className="border text-center">
											<div className="flex justify-center">
												<Link
													to={`/dashboard/change-role/${user.email}`}
													className="text-blue-400 mx-1"
												>
													Change Role
												</Link>
												<form
													onSubmit={deleteUser}
													className="text-red-400 mx-1"
												>
													<input type="hidden" name="userId" value={user._id} />
													<button type="submit">Delete</button>
												</form>
											</div>
										</td>
									</>
								</tr>
							);
						})}
				</tbody>
			</table>
		</div>
	);
};

export default ManageUsers;
