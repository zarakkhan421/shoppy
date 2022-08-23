import useAxios from "./useAxios";

const useAxiosApiCall = (url, method, params) => {
	const axiosInstance = useAxios();
	try {
		const response = axiosInstance.method(url);
		console.log("useaxioscall", response);
	} catch (error) {
		console.log(error);
	}
};
export default useAxiosApiCall;
