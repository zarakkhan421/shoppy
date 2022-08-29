import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reset } from "../../features/userSlice";
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
				dispatch(reset());
				navigate("/");
			};
			logout();
		} catch (error) {
			console.log(error);
		}
	}, []);
	console.log("r");
};

export default Logout;
