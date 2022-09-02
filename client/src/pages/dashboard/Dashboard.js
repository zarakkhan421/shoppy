import React from "react";
import { useSelector } from "react-redux";
import { NavLink, Outlet, useLocation, matchPath } from "react-router-dom";
import { getAvatar, getFirstName, getLastName } from "../../features/userSlice";
import useAllowedContent from "../../hooks/useAllowedContent";
const Dashboard = () => {
	const { isAdmin, isEditorAdmin } = useAllowedContent();
	const userName = useSelector(getFirstName) + " " + useSelector(getLastName);
	const avatar = useSelector(getAvatar);
	const location = useLocation();

	return (
		<div className="table w-full ">
			<div className="mr-2 w-2/12 pt-8 items-stretch table-cell bg-white h-[95vh] align-top">
				<div className="mb-3">
					<div className="flex justify-center">
						<img
							src={avatar}
							alt="avatar"
							width={250}
							height="250"
							className="rounded-full mb-2 object-cover h-[125px] w-[125px]"
						/>
					</div>
					<div className="text-center font-semibold">Welcome, {userName}</div>
				</div>
				<div className="flex flex-col">
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="products/"
					>
						Products
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="products/create"
					>
						Create Product
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="profile/edit"
					>
						Edit Profile
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive && location.pathname === "/dashboard/orders"
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="orders"
					>
						My Orders
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="orders/all"
					>
						Orders
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive && location.pathname === "/dashboard/reviews"
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="reviews"
					>
						My Reviews
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							"font-semibold w-full py-2 px-2 mb-1 text-center text-lg  " +
							(isActive
								? " bg-primary text-white"
								: "bg-white text-gray-2 border border-gray-1")
						}
						to="reviews/all"
					>
						Reviews
					</NavLink>
				</div>
			</div>
			<div className="w-10/12 table-cell pt-3 pl-5">
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
