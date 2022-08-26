import axios from "axios";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { refreshAccessToken } from "../features/userSlice";
import { getAccessToken } from "../features/userSlice";

const useAxiosPrivate = () => {
	const accessToken = useSelector(getAccessToken);
	const dispatch = useDispatch();
	console.log("3333333333", accessToken);
	const axiosPrivateInstance = axios.create({
		baseURL: "http://localhost:5000/api",
		headers: {
			"Content-Type": "application/json",
		},
	});
	axiosPrivateInstance.interceptors.request.use(async (req) => {
		console.log(accessToken);
		req.headers.Authorization = `Bearer ${accessToken}`;
		const decodedAccessToken = jwtDecode(accessToken);

		const expireTime = decodedAccessToken.exp * 1000;
		const date = Date.now();
		if (expireTime < date) {
			console.log("in refresh t");
			const response = await axios.get(
				"http://localhost:5000/api/user/refresh-access-token",
				{
					withCredentials: true,
				}
			);
			console.log(response);
			dispatch(refreshAccessToken(response.data));
			req.headers.Authorization = `Bearer ${response.data.serverData.accessToken}`;
			return req;
		}
		return req;
	});
	return axiosPrivateInstance;
};

export default useAxiosPrivate;
