import Nav from "./layouts/NavBar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Shop from "./pages/Shop";
import CreateProduct from "./pages/dashboard/outlets/CreateProduct";
import ProtectedRoute from "./routes/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import UnAuthorized from "./pages/UnAuthorized";
import Products from "./pages/dashboard/outlets/Products";
import EditProduct from "./pages/dashboard/outlets/EditProduct";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import EditProfile from "./pages/dashboard/outlets/EditProfile";
import Orders from "./pages/dashboard/outlets/Orders";
import MyOrders from "./pages/dashboard/outlets/MyOrders";
import OrderStatus from "./pages/dashboard/outlets/OrderStatus";
import Reviews from "./pages/dashboard/outlets/Reviews";
import MyReviews from "./pages/dashboard/outlets/MyReviews";
import CreateReview from "./pages/dashboard/outlets/CreateReview";
import EditReview from "./pages/dashboard/outlets/EditReview";
import { useDispatch, useSelector } from "react-redux";
import { refreshAuth, getIsLoggedIn, getIsLoading } from "./features/userSlice";
import Logout from "./pages/auth/Logout";
import ResetPassword from "./pages/auth/ResetPassword";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ChangeRole from "./pages/dashboard/outlets/ChangeRole";
import ManageUsers from "./pages/dashboard/outlets/ManageUsers";
import { useEffect, useState } from "react";
function App() {
	const reduxState = useSelector((state) => state);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const isLoading = useSelector(getIsLoading);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	if (localStorage.getItem("login")) {
		console.log("not set");
		localStorage.setItem("login", "false");
	}
	if (
		!reduxState.auth.accessToken &&
		!reduxState.auth.isLoggedIn &&
		localStorage.getItem("login") === "true"
	) {
		dispatch(refreshAuth());
	}

	return (
		<div>
			<Nav />
			<div className="lg:container mx-auto">
				<Routes>
					<Route path="/unauthorized" element={<UnAuthorized />} />
					<Route path="/search" element={<Search />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/checkout" element={<Checkout />} />

					{/* dashboard routes */}
					<Route
						path="/dashboard"
						element={<ProtectedRoute Component={Dashboard} />}
					>
						<Route
							path="change-role/:email"
							element={
								<ProtectedRoute
									AllowedRoles={["admin"]}
									Component={ChangeRole}
								/>
							}
						/>
						<Route
							path="manage-users"
							element={
								<ProtectedRoute
									AllowedRoles={["admin"]}
									Component={ManageUsers}
								/>
							}
						/>
						{/* products/* */}
						<Route path="products">
							<Route
								index
								element={
									<ProtectedRoute
										AllowedRoles={["admin", "editor"]}
										Component={Products}
									/>
								}
							/>
							<Route
								path="create"
								element={
									<ProtectedRoute
										AllowedRoles={["admin"]}
										Component={CreateProduct}
									/>
								}
							/>
							<Route
								path="edit/:id"
								element={
									<ProtectedRoute
										AllowedRoles={["admin", "editor"]}
										Component={EditProduct}
									/>
								}
							/>
						</Route>
						{/* end products/* */}
						<Route
							path="profile/edit"
							element={<ProtectedRoute Component={EditProfile} />}
						/>
						{/* orders */}
						<Route path="orders">
							<Route index element={<ProtectedRoute Component={MyOrders} />} />
							<Route
								path="all"
								element={
									<ProtectedRoute
										AllowedRoles={["admin", "editor"]}
										Component={Orders}
									/>
								}
							/>
							<Route
								path="status/:id"
								element={
									<ProtectedRoute
										AllowedRoles={["admin", "editor"]}
										Component={OrderStatus}
									/>
								}
							/>
						</Route>
						{/* end orders routes */}
						{/* reviews routes */}
						<Route path="reviews">
							<Route index element={<ProtectedRoute Component={MyReviews} />} />
							<Route
								path="create/:order_item"
								element={<ProtectedRoute Component={CreateReview} />}
							/>
							<Route
								path="all"
								element={
									<ProtectedRoute
										AllowedRoles={["admin", "editor"]}
										Component={Reviews}
									/>
								}
							/>
							<Route
								path="edit/:id"
								element={<ProtectedRoute Component={EditReview} />}
							/>
						</Route>
						{/* end reviews routes */}
					</Route>
					{/* end dashboard routes */}

					<Route path="products/:id" element={<SingleProduct />} />
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/shop" element={<Shop />} />
					<Route path="/logout" element={<Logout />} />
					<Route
						path="reset-password/:reset_token"
						element={<ResetPassword />}
					/>
					<Route path="forget-password" element={<ForgetPassword />} />
					<Route exact path="/" element={<Home />} />
				</Routes>
			</div>
			<Footer />
		</div>
	);
}

export default App;
