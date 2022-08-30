import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserId, getUserRole } from "../features/userSlice";
const ProtectedRoute = (props, children) => {
	console.log(children);
	const userId = useSelector(getUserId);
	const userRole = useSelector(getUserRole);
	const navigate = useNavigate();
	const { Component } = props;
	useEffect(() => {
		if (props.AllowedRoles) {
			if (!props.AllowedRoles.includes(userRole)) {
				navigate("/unauthorized");
			}
		}
		if (userId === undefined) navigate("/login");
	});

	return (
		<>
			<Component />
		</>
	);
};

export default ProtectedRoute;
