import { useState, useEffect } from "react";
import Product from "../components/common/Product";
import useAxios from "../hooks/useAxios";
import Select, { components } from "react-select";
import { Rating } from "react-simple-star-rating";
import { VscTriangleDown } from "react-icons/vsc";
let priceChanged = false;
const Shop = () => {
	const axiosInstance = useAxios();
	const [products, setProducts] = useState([]);
	const [page, setPage] = useState(1);
	const [minPrice, setMinPrice] = useState(0);
	const [maxPrice, setMaxPrice] = useState(10000);
	const [ratings, setRatings] = useState(0);
	const [count, setCount] = useState(0);
	const [resultPerPage, setResultPerPage] = useState(0);
	const [noOfPages, setNoOfPages] = useState(0);
	console.log(noOfPages);
	const [openRating, setOpenRating] = useState(false);
	console.log(ratings);
	const getProducts = async () => {
		try {
			const response = await axiosInstance.get(
				`/products?page=${page}&price[gte]=${Number(
					minPrice
				)}&price[lte]=${Number(maxPrice)}&ratings=${Number(ratings)}`
			);
			console.log(response);
			// setCount(response.data.serverData.count);
			// setResultPerPage(response.data.serverData.resultPerPage);
			setProducts(response.data.serverData.products);
			setNoOfPages(
				Math.ceil(
					response.data.serverData.count /
						response.data.serverData.resultPerPage
				)
			);
			if (!priceChanged) {
				setMaxPrice(response.data.serverData.maxProductPrice);
			}
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getProducts();
	}, [minPrice, maxPrice, ratings, page]);

	const onChangePrice = (e) => {
		console.log(e.target.name);
		if (e.target.name === "minValue") {
			const diff = maxPrice - e.target.value;
			if (diff >= 1) {
				if (e.target.value >= 0) setMinPrice(e.target.value);
			}
		} else {
			const diff = e.target.value - minPrice;
			if (diff >= 1) {
				priceChanged = true;
				setMaxPrice(e.target.value);
			}
		}
	};

	return (
		<div className="flex flex-col min-h-[60vh]">
			<div className="flex flex-wrap my-2 mb-4">
				<div className="flex mr-2 items-center">
					<label htmlFor="" className="text-lg mr-1">
						Min Value
					</label>
					<input
						type="text"
						name="minValue"
						id="minValue"
						value={minPrice}
						onChange={onChangePrice}
						className={`border border-gray-2 rounded outline-gray-1 h-8`}
					/>
				</div>
				<div className="flex mr-2 items-center">
					<label htmlFor="" className="text-lg mr-1">
						Max Value
					</label>
					<input
						type="text"
						name="maxValue"
						id="maxValue"
						value={maxPrice}
						onChange={onChangePrice}
						className={`border border-gray-2 rounded  outline-gray-1 h-8`}
					/>
				</div>
				<div className="flex mr-2 items-center">
					<label htmlFor="" className="text-lg mr-1">
						Ratings
					</label>

					<div className="">
						<div className="relative flex border w-[160px] border-gray-2 h-9 items-center">
							<input
								type="checkbox"
								checked={openRating}
								onChange={(e) => setOpenRating(e.target.checked)}
								className="absolute w-full h-full top-0 left-0 z-20 opacity-0 cursor-pointer"
							/>
							<Rating
								initialValue={ratings}
								readonly
								iconsCount={5}
								className="z-10 my-1"
								size={25}
							/>
							<VscTriangleDown
								className={`w-8 h-8 text-slate-600 transition-all ease duration-200 ${
									openRating ? "rotate-180" : ""
								}`}
							/>
						</div>
						{openRating && (
							<div
								className={`border absolute w-[161px] z-20 bg-white border-t-0`}
							>
								<div className="relative border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(5);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={5}
										readonly
										iconsCount={5}
										className="z-10 w-full"
										size={25}
									/>
								</div>
								<div className="relative  border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(3);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={4}
										readonly
										iconsCount={4}
										className="z-10 w-full"
										size={25}
									/>
								</div>
								<div className="relative  border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(3);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={3}
										readonly
										iconsCount={3}
										className="z-10 w-full"
										size={25}
									/>
								</div>
								<div className="relative  border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(2);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={2}
										readonly
										iconsCount={2}
										className="z-10 w-full"
										size={25}
									/>
								</div>
								<div className="relative  border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(1);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={1}
										readonly
										iconsCount={1}
										className="z-10 w-full"
										size={25}
									/>
								</div>
								<div className="relative  border border-gray-2 border-t-0">
									<input
										type="checkbox"
										onChange={(e) => {
											e.target.checked && setRatings(0);
											setOpenRating(false);
										}}
										className="w-full h-full top-0 left-0 opacity-0 absolute z-20 cursor-pointer"
									/>
									<Rating
										initialValue={0}
										readonly
										iconsCount={5}
										className="z-10 w-full"
										size={25}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
			<div>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
					{products.map((product) => {
						return (
							<div className="col-span-1">
								<Product key={product._id} product={product} />
							</div>
						);
					})}
				</div>
			</div>
			<div className="flex justify-center mt-8 w-full">
				<button
					className="text-blue-500 disabled:text-slate-400 mr-2"
					disabled={page === 1}
					onClick={() => setPage((page) => page - 1)}
				>
					Previous
				</button>
				{[...Array(noOfPages)].map((_, i) => {
					return (
						<button
							key={i}
							className={`mr-2 px-2 py-1 rounded-sm ${
								page === i + 1 ? "bg-primary text-white" : ""
							} `}
							onClick={(e) => setPage(i + 1)}
						>
							{i + 1}
						</button>
					);
				})}
				<button
					className="text-blue-500 disabled:text-slate-400"
					onClick={() => setPage((page) => page + 1)}
					disabled={page === noOfPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default Shop;
