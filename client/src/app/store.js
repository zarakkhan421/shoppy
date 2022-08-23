import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../features/userSlice";
export const store = configureStore({
	reducer: {
		auth: AuthReducer,
	},
});
