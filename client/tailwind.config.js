/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				gray: {
					1: "#535353",
					2: "#8C8C8C",
				},
				white: {
					DEFAULT: "#F8F8F8",
				},
				primary: {
					50: "#FFE5EB",
					100: "#FFCCD8",
					200: "#FF99B1",
					300: "#FF668A",
					400: "#FF2E5F",
					DEFAULT: "#FB003C",
					600: "#C7002E",
					700: "#990024",
					800: "#660018",
					900: "#33000C",
				},
			},
		},
	},
	plugins: [],
};
