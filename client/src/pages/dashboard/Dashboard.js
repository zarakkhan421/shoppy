import React from "react";
import { Link, Outlet } from "react-router-dom";
const Dashboard = () => {
	return (
		<div>
			<div className="flex">
				<div className="flex flex-col bg-orange-300">
					<Link to="products/">Products</Link>
					<Link to="products/create">Create Product</Link>
					<Link to="profile/edit">Edit Profile</Link>
					<Link to="orders">My Orders</Link>
					<Link to="orders/all">Orders</Link>
					<Link to="reviews">My Reviews</Link>
					<Link to="reviews/all">Reviews</Link>
				</div>
				design a default dashboard page that all site data
				<Outlet />
			</div>
		</div>
	);
};

export default Dashboard;
