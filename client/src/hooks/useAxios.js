import axios from "axios";
import { SERVER_URL } from "../config/Constants";

const useAxios = () => {
	const axiosInstance = axios.create({
		baseURL: SERVER_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});
	return axiosInstance;
};

export default useAxios;
