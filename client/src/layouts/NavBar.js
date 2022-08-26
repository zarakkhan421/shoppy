import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getUserId, getCart } from "../features/userSlice";
import useAllowedContent from "../hooks/useAllowedContent";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useEffect, useState } from "react";
const NavBar = () => {
	const isLoggedIn = useSelector(getIsLoggedIn);
	const cart = useSelector(getCart);
	console.log(cart);

	return (
		<nav>
			<div className=" container mx-auto nav-bar flex justify-between items-center w-full h-10 ">
				<div className="flex w-1/3">
					<Link to="/">Shoppy</Link>
				</div>
				<ul className="flex w-2/3 justify-between">
					<div className="flex w-1/4 justify-between">
						<Link to="/" className="font-bold">
							Home
						</Link>
						<Link to="shop" className="font-bold">
							Shop
						</Link>
						<Link to="dashboard" className="font-bold">
							Dashboard
						</Link>
					</div>
					<div className="flex w-2/5 justify-between">
						<Link to="search" className="flex items-center">
							<FaSearch className="w-5 h-5" />
						</Link>
						<Link to="register" className="flex items-center">
							<CgProfile className="w-5 h-5 mr-1 " /> <div> Register</div>
						</Link>
						<Link to="logout" className="flex items-center">
							<FiLogOut className="w-5 h-5" /> <div> Logout</div>
						</Link>
						<Link to="login" className="flex items-center">
							<FiLogIn className="w-5 h-5" /> <div>Login</div>
						</Link>
						<Link to="cart" className="flex items-center relative">
							<FaShoppingCart className="w-5 h-5" />
							{cart.length > 0 && (
								<div className="absolute flex justify-center items-center top-[-1px] right-[-15px] bg-primary text-white rounded-full w-5 h-5">
									{cart.length}
								</div>
							)}
						</Link>
					</div>
				</ul>
			</div>
			<div className="mt-1 border-b-[1px] border-gray-1"></div>
		</nav>
	);
};

export default NavBar;
