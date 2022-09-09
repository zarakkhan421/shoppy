import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getIsLoggedOut, reset } from "../../features/userSlice";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Logout = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		try {
			const logout = async () => {
				const response = await axiosPrivateInstance.get("/user/logout");
				console.log(response);
				localStorage.setItem("login", "false");
				dispatch(reset());
				navigate("/");
			};
			logout();
		} catch (error) {
			console.log(error);
		}
	}, []);
	console.log("r");
	return <></>;
};

export default Logout;
