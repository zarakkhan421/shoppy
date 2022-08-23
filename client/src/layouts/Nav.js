import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn, getUserId } from "../features/userSlice";
import useAllowedContent from "../hooks/useAllowedContent";

const Nav = () => {
	const isAdmin = useAllowedContent(["admin"]);
	const isAdminEditor = useAllowedContent(["admin", "editor"]);
	const isLoggedIn = useSelector(getIsLoggedIn);
	return (
		<nav>
			<div className="brand logo">Logo</div>
			<div className="nav-bar">
				<ul className="flex flex-row justify-around">
					<Link to="/">Home</Link>
					<Link to="shop">Shop</Link>
					<Link to="register">Register</Link>
					<Link to="login">Login</Link>
					<Link to="dashboard">Dashboard</Link>
					<Link to="search">Search</Link>
					<Link to="cart">Cart</Link>
					<Link to="dashboard/products/create">Create Product</Link>
					{isAdmin && <Link to="admin-page"> admin page</Link>}
					{isAdminEditor && <Link to="editor-page"> editor</Link>}
					{isLoggedIn && <Link to="user-page"> user page</Link>}
				</ul>
			</div>
		</nav>
	);
};

export default Nav;
