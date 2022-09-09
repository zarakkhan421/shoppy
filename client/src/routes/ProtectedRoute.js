import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
	getUserId,
	getUserRole,
	getIsLoading,
	getIsLoggedIn,
} from "../features/userSlice";
const ProtectedRoute = (props, children) => {
	console.log(children);
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const isLoading = useSelector(getIsLoading);
	const isLoggedIn = useSelector(getIsLoggedIn);
	const navigate = useNavigate();
	const { Component } = props;
	useEffect(() => {
		if (props.AllowedRoles) {
			if (
				!props.AllowedRoles.includes(userRole) &&
				isLoggedIn &&
				!isLoading &&
				!userId
			) {
				navigate("/unauthorized");
			}
		}
		if (userId === undefined && !userId && !isLoading) navigate("/login");
	});

	return (
		<>
			<Component />
		</>
	);
};

export default ProtectedRoute;
