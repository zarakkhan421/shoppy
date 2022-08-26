import { useSelector } from "react-redux";
import { getUserId, getUserRole } from "../features/userSlice";

const useAllowedContent = (roles) => {
	const userRole = useSelector(getUserRole);
	const userId = useSelector(getUserId);
	let isAdmin = false;
	let isEditorAdmin = false;
	if (userRole === "admin" || userRole === "editor") {
		isEditorAdmin = true;
	}
	if (userRole === "admin") {
		isAdmin = true;
	}

	// if (roles.includes(userRole)) {
	// 	return true;
	// }
	// if (!userId) {
	// 	return false;
	// }
	return { isAdmin, isEditorAdmin };
};

export default useAllowedContent;
