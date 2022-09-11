import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getIsLoggedIn } from "../features/userSlice";
const Footer = () => {
	const isLoggedIn = useSelector(getIsLoggedIn);
	return (
		<div className="w-full h-[200px] border-t-2 border-solid mt-8 bg-gray-1">
			<div className="lg:container mx-auto">
				<div className="flex items-start mt-2">
					<div className="w-1/3">
						<Link to="/" className="font-extrabold text-lg text-white">
							Shoppy
						</Link>
					</div>
					<div className="flex flex-col w-1/3 h-[50%] justify-between">
						<Link to="shop" className="font-bold text-white mb-2">
							Shop
						</Link>
						{isLoggedIn && (
							<Link to="dashboard" className="font-bold text-white mb-2">
								Dashboard
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
