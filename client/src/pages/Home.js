import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import HomeSection from "../components/HomeSection";
import useAllowedContent from "../hooks/useAllowedContent";

const Home = () => {
	const axiosInstance = useAxios();
	const [products, setProducts] = useState([]);
	const [productsCount, setProductsCount] = useState(0);
	const [featuredProducts, setFeaturedProducts] = useState([]);
	const [featuredCount, setFeaturedCount] = useState(0);
	const [salesProducts, setSalesProducts] = useState([]);
	const [salesCount, setSalesCount] = useState(0);

	const { isAdmin, isEditorAdmin } = useAllowedContent();
	useEffect(() => {
		const getProducts = async () => {
			try {
				const response = await axiosInstance.get("/products");
				console.log(response);
				setProducts(response.data.serverData.products);
				setProductsCount(response.data.serverData.count);
			} catch (error) {
				console.log(error);
			}
		};
		const getFeaturedProducts = async () => {
			try {
				const response = await axiosInstance.get("/products/featured");
				console.log(response);
				setFeaturedProducts(response.data.serverData.featuredProducts);
				setFeaturedCount(response.data.serverData.count);
			} catch (error) {
				console.log(error);
			}
		};
		const getSalesProducts = async () => {
			try {
				const response = await axiosInstance.get("/products/sale");
				console.log(response);
				setSalesProducts(response.data.serverData.saleProducts);
				setSalesCount(response.data.serverData.count);
			} catch (error) {
				console.log(error);
			}
		};
		getProducts();
		getFeaturedProducts();
		getSalesProducts();
	}, []);

	return (
		<div className=" min-h-[60vh]">
			<HomeSection
				key={"featured"}
				products={featuredProducts}
				title="Featured Products"
				count={featuredCount}
			/>
			<HomeSection
				key={"sales"}
				products={salesProducts}
				title="Sales Products"
				count={salesCount}
				classes="mt-6"
			/>
		</div>
	);
};

export default Home;
