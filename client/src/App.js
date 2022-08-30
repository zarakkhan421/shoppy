import Nav from "./layouts/NavBar";
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
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useDispatch } from "react-redux";
import { reset } from "./features/userSlice";
import Logout from "./pages/auth/Logout";
function App() {
	return (
		<div>
			<Nav />
			<div className="container mx-auto">
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
								path="status/:id/:item"
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
								path="create/:order/:item"
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
					<Route path="logout" element={<Logout />} />
					<Route exact path="/" element={<Home />} />
				</Routes>
			</div>
		</div>
	);
}

export default App;
