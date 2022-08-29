import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
	user: {},
	accessToken: "",
	isLoggedIn: false,
	isLoading: false,
	isSuccess: false,
	error: {},
	cart: [],
};

export const login = createAsyncThunk(
	"auth/login",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/user/login",
				userData,
				{
					withCredentials: true,
				}
			);
			console.log("response login", response);
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(error.response.data);
		}
	}
);

export const register = createAsyncThunk(
	"auth/register",
	async (userData, thunkAPI) => {
		try {
			const response = await axios.post(
				"http://localhost:5000/api/user/register",
				userData,
				{
					withCredentials: true,
				}
			);
			console.log("response register", response);
			return response.data;
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
		cart: (state, actions) => {
			state.cart = actions?.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.user = action.payload;
				state.accessToken = action.payload.serverData?.accessToken;
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
			});
	},
});

export const getAccessToken = (state) => state.auth.accessToken;
export const getUserId = (state) => state.auth.user?.serverData?.user._id;
export const getUserRole = (state) => state.auth.user?.serverData?.user.role;
export const getfirstName = (state) =>
	state.auth.user.serverData?.user.firstName;
export const getlastName = (state) =>
	state.auth.user?.serverData?.user.lastName;
export const getIsLoggedIn = (state) => state.auth.isLoggedIn;
export const getIsLoading = (state) => state.auth.isLoading;
export const getCart = (state) => state?.auth.cart;

export const { reset, refreshAccessToken, cart } = counterSlice.actions;

export default counterSlice.reducer;
