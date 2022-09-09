import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getIsLoading, getIsLoggedIn } from "../features/userSlice";

const UnAuthorized = () => {
	return (
		<div>
			<div className="">
				<span className="font-semibold">401</span> You are not authorized to
				access this resource
			</div>
		</div>
	);
};

export default UnAuthorized;
