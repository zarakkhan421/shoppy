import Nav from "./layouts/Nav";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./pages/dashboard/Dashboard";
import Shop from "./pages/Shop";
import CreateProduct from "./pages/dashboard/outlets/CreateProduct";
import ProtectedRoute from "./routes/ProtectedRoute";
import SingleProduct from "./pages/SingleProduct";
import AdminPage from "./pages/dashboard/outlets/AdminPage";
import EditorPage from "./pages/dashboard/outlets/EditorPage";
import UserPage from "./pages/dashboard/outlets/UserPage";
import UnAuthorized from "./pages/UnAuthorized";
import Products from "./pages/dashboard/outlets/Products";
import EditProduct from "./pages/dashboard/outlets/EditProduct";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import EditProfile from "./pages/dashboard/outlets/EditProfile";

function App() {
	return (
		<div>
			<Nav />
			<Routes>
				<Route path="/unauthorized" element={<UnAuthorized />} />
				<Route path="/search" element={<Search />} />
				<Route path="/cart" element={<Cart />} />
				<Route path="/checkout" element={<Checkout />} />
				<Route
					path="/admin-page"
					element={
						<ProtectedRoute AllowedRoles={["admin"]} Component={AdminPage} />
					}
				/>
				<Route
					path="/editor-page"
					element={
						<ProtectedRoute
							AllowedRoles={["admin", "editor"]}
							Component={EditorPage}
						/>
					}
				/>
				<Route
					path="/user-page"
					element={<ProtectedRoute Component={UserPage} />}
				/>
				{/* dashboard routes */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute
							AllowedRoles={["admin", "editor"]}
							Component={Dashboard}
						/>
					}
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
						element={
							<ProtectedRoute
								AllowedRoles={["admin", "editor"]}
								Component={EditProfile}
							/>
						}
					/>
				</Route>
				{/* end dashboard routes */}

				<Route path="products/:id" element={<SingleProduct />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/shop" element={<Shop />} />

				<Route exact path="/" element={<Home />} />
			</Routes>
		</div>
	);
}

export default App;
