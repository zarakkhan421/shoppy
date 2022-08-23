import { useSelector } from "react-redux";
import { getUserId, getUserRole } from "../features/userSlice";

const useAllowedContent = (roles) => {
	const userRole = useSelector(getUserRole);
	const userId = useSelector(getUserId);
	if (roles.includes(userRole)) {
		return true;
	}
	if (!userId) {
		return false;
	}
	return false;
};

export default useAllowedContent;
