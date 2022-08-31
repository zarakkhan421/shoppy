import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getUserId, getCart } from "../features/userSlice";
import useAllowedContent from "../hooks/useAllowedContent";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import { RiCloseFill } from "react-icons/ri";
const NavBar = () => {
	const isLoggedIn = useSelector(getIsLoggedIn);
	const cart = useSelector(getCart);
	console.log(cart);
	const [isOpen, setIsOpen] = useState(false);
	return (
		<nav>
			{/* below :lg should have different navbar */}
			<div className=" container mx-auto nav-bar hidden lg:flex justify-between items-center w-full h-[4.5vh]">
				<div className="flex w-1/4 xl:w-2/5">
					<Link to="/" className="font-extrabold text-lg text-gray-1">
						Shoppy
					</Link>
				</div>
				<ul className="flex w-3/4 xl:w-3/5 justify-between">
					<div className="flex w-4/12 justify-around">
						<Link to="/" className="font-bold text-gray-1">
							Home
						</Link>
						<Link to="shop" className="font-bold text-gray-1">
							Shop
						</Link>
						<Link to="dashboard" className="font-bold text-gray-1">
							Dashboard
						</Link>
					</div>
					<div
						className={`flex w-5/12 2xl:w-6/12 justify-around ${
							isLoggedIn && "2xl:w-3/12"
						}`}
					>
						<Link to="search" className="flex items-center text-gray-1">
							<FaSearch className="w-5 h-5 text-gray-1" />
						</Link>
						{!isLoggedIn && (
							<Link to="register" className="flex items-center text-gray-1">
								<CgProfile className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1"> Register</div>
							</Link>
						)}
						{isLoggedIn && (
							<Link to="logout" className="flex items-center text-gray-1">
								<FiLogOut className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1"> Logout</div>
							</Link>
						)}
						{!isLoggedIn && (
							<Link to="login" className="flex items-center text-gray-1">
								<FiLogIn className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1">Login</div>
							</Link>
						)}
						<Link to="cart" className="flex items-center relative text-gray-1">
							<FaShoppingCart className="w-5 h-5 text-gray-1" />
							{cart.length > 0 && (
								<div className="absolute flex justify-center items-center top-[-1px] right-[-15px] bg-primary text-white rounded-full w-5 h-5">
									{cart.length}
								</div>
							)}
						</Link>
					</div>
				</ul>
			</div>
			{/* different nav */}
			<div
				className={`${
					isOpen && "bg-white"
				} nav-bar flex flex-col lg:hidden justify-between items-center w-full`}
			>
				<div className="container mx-auto flex w-full justify-between z-20 items-center m-y-2 h-12">
					<div className="">
						<Link to="/" className="font-extrabold text-lg text-gray-1">
							Shoppy
						</Link>
					</div>
					<div className="flex items-center">
						<Link to="cart" className="flex relative">
							<FaShoppingCart className="w-6 h-6  text-gray-1" />
							{cart.length > 0 && (
								<div className="absolute flex justify-center items-center top-[-1px] right-[-15px] bg-primary text-white rounded-full w-5 h-5">
									{cart.length}
								</div>
							)}
						</Link>
						<label htmlFor="" className="relative ml-2">
							<input
								type="checkbox"
								checked={isOpen}
								onChange={(e) => setIsOpen(e.target.checked)}
								className="absolute w-6 h-6 opacity-0"
							/>
							{isOpen ? (
								<RiCloseFill className="w-6 h-6  text-gray-1" />
							) : (
								<GiHamburgerMenu className="w-6 h-6 text-gray-1" />
							)}
						</label>
					</div>
				</div>
				<div
					className={`${
						isOpen ? "translate-y-0" : "-translate-y-96"
					}  flex-col  items-center w-full justify-between z-10  transition-all ease-[cubic-bezier(0.18, 0.89, 0.32, 1.28)] duration-[500ms] h-0`}
				>
					<div className="flex flex-col justify-between items-center space-y-2 pb-2 bg-white">
						<Link
							to="/"
							onClick={() => setIsOpen(false)}
							className="font-bold text-gray-1"
						>
							Home
						</Link>
						<Link
							to="shop"
							onClick={() => setIsOpen(false)}
							className="font-bold text-gray-1"
						>
							Shop
						</Link>
						{isLoggedIn && (
							<Link
								to="dashboard"
								onClick={() => setIsOpen(false)}
								className="font-bold text-gray-1"
							>
								Dashboard
							</Link>
						)}
					</div>
					<div className="flex flex-col justify-between items-center space-y-2 pb-2 bg-white">
						<Link
							to="search"
							onClick={() => setIsOpen(false)}
							className="flex items-center text-gray-1"
						>
							<FaSearch className="w-5 h-5 text-gray-1" />
						</Link>
						{!isLoggedIn && (
							<Link
								to="register"
								onClick={() => setIsOpen(false)}
								className="flex items-center text-gray-1"
							>
								<CgProfile className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1"> Register</div>
							</Link>
						)}
						{isLoggedIn && (
							<Link
								to="logout"
								onClick={() => setIsOpen(false)}
								className="flex items-center"
							>
								<FiLogOut className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1"> Logout</div>
							</Link>
						)}
						{!isLoggedIn && (
							<Link
								to="login"
								onClick={() => setIsOpen(false)}
								className="flex items-center"
							>
								<FiLogIn className="w-5 h-5 mr-2 text-gray-1" />
								<div className="font-regular text-gray-1">Login</div>
							</Link>
						)}
					</div>
				</div>
			</div>
			<div className="mt-1 lg:border-b-[1px] border-gray-1"></div>
		</nav>
	);
};

export default NavBar;
