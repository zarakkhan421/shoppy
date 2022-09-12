export const SERVER_URL =
	process.env.NODE_ENV === "production"
		? process.env.SERVER_URL
		: "http://localhost:5000/api/";
