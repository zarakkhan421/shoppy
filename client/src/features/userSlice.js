import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initialState = {
	user: {},
	accessToken: "",
	isLoggedIn: false,
	isLoading: false,
	isSuccess: false,
	message: "",
	error: {},
	cart: [],
};

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const response = axios.post(
				"http://localhost:5000/api/user/login",
				userData,
				{
					withCredentials: true,
				}
			);
			toast.promise(response, {
				pending: "LoggingIn, Please wait...",
				success: "LoggedIn",
			});
			const resolved = await response;

			console.log("response login", await response);
			return resolved.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const response = axios.post(
				"http://localhost:5000/api/user/register",
				userData,
				{
					withCredentials: true,
				}
			);
			toast.promise(response, {
				pending: "Please wait...",
				success: "You have registered!",
			});
			const resolved = await response;
			console.log("response register", await response);
			return resolved.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const counterSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		reset: (state) => {
			state.user = {};
			state.accessToken = "";
			state.isLoggedIn = false;
			state.isLoading = false;
			state.isSuccess = false;
			state.error = {};
		},
		refreshAccessToken: (state, actions) => {
			state.accessToken = actions.payload?.serverData.accessToken;
		},
		setReduxCart: (state, actions) => {
			state.cart = actions?.payload;
		},
		resetReduxCart: (state, actions) => {
			state.cart = [];
		},
		setReduxIsLoading: (state, actions) => {
			state.isLoading = actions.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.accessToken = action.payload?.serverData?.accessToken;
				state.isLoading = false;
				state.isLoggedIn = true;
				state.isSuccess = true;
				state.error = {};
			})
			.addCase(login.rejected, (state, action) => {
				state.user = {};
				state.error = action.payload;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload.message;
			})
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.user = action.payload;
				state.accessToken = action.payload?.serverData?.accessToken;
				state.isLoading = false;
				state.isLoggedIn = true;
				state.isSuccess = true;
				state.error = {};
			})
			.addCase(register.rejected, (state, action) => {
				state.user = {};
				state.error = action.payload;
				state.isLoading = false;
				state.isSuccess = false;
				state.message = action.payload.message;
			});
	},
});

export const getAccessToken = (state) => state.auth.accessToken;
export const getUserId = (state) => state.auth.user?.serverData?.user._id;
export const getUserRole = (state) => state.auth.user?.serverData?.user.role;
export const getFirstName = (state) =>
	state.auth.user.serverData?.user.firstName;
export const getLastName = (state) =>
	state.auth.user?.serverData?.user.lastName;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getIsLoading = (state) => state.auth?.isLoading;
export const getIsSuccess = (state) => state.auth?.isSuccess;
export const getMessage = (state) => state.auth?.message;
export const getCart = (state) => state?.auth.cart;
export const getAvatar = (state) => state.auth.user?.serverData?.user.image.url;

export const {
	reset,
	refreshAccessToken,
	setReduxCart,
	resetReduxCart,
	setReduxIsLoading,
} = counterSlice.actions;

export default counterSlice.reducer;
