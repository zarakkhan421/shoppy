import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { setReduxCart } from "../features/userSlice";
import { Rating } from "react-simple-star-rating";
import useAxios from "../hooks/useAxios";
import moment from "moment";
import { AiOutlineHome } from "react-icons/ai";
import { BsCurrencyDollar } from "react-icons/bs";
const SingleProduct = () => {
	const [product, setProduct] = useState({});
	const [reviews, setReviews] = useState([]);
	const [ratingsEqualToFive, setRatingsEqualToFive] = useState(0);
	const [ratingsGreaterThanFour, setRatingsGreaterThanFour] = useState(0);
	const [ratingsGreaterThanThree, setRatingsGreaterThanThree] = useState(0);
	const [ratingsGreaterThanTwo, setRatingsGreaterThanTwo] = useState(0);
	const [ratingsGreaterThanOne, setRatingsGreaterThanOne] = useState(0);
	const params = useParams();
	const productId = params.id;
	const dispatch = useDispatch();
	const axiosInstance = useAxios();
	const { addToCart, getCart, removeCartItem } = useLocalStorage();

	const handleBuyNow = () => {
		console.log("buy");
		addToCart(product);
		console.log(getCart());
		dispatch(setReduxCart(getCart()));
	};
	const handleAddToCart = () => {
		console.log("add");
		addToCart(product);
		console.log(getCart());
		dispatch(setReduxCart(getCart()));
	};
	const handleRemoveCartItem = () => {
		console.log(getCart());
		removeCartItem(product);
		console.log(getCart());
		dispatch(setReduxCart(getCart()));
	};
	useEffect(() => {
		const getProduct = async () => {
			try {
				const response = await axios.get(
					`http://localhost:5000/api/products/${productId}`
				);
				setProduct(response.data.serverData.product);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		const getReviews = async () => {
			try {
				const response = await axiosInstance.get(
					`/reviews/product/${productId}`
				);
				setReviews(response.data.serverData.reviews);
			} catch (error) {
				console.log(error);
			}
		};
		getProduct();
		getReviews();
	}, []);
	useEffect(() => {
		setRatingsEqualToFive(
			String(
				(reviews.filter((review) => review.rating === 5).length /
					reviews.length) *
					100
			) + "%"
		);
		setRatingsGreaterThanFour(
			String(
				(reviews.filter((review) => review.rating >= 4 && review.rating < 5)
					.length /
					reviews.length) *
					100
			) + "%"
		);
		setRatingsGreaterThanThree(
			String(
				(reviews.filter((review) => review.rating >= 3 && review.rating < 4)
					.length /
					reviews.length) *
					100
			) + "%"
		);
		setRatingsGreaterThanTwo(
			String(
				(reviews.filter((review) => review.rating >= 2 && review.rating < 3)
					.length /
					reviews.length) *
					100
			) + "%"
		);
		setRatingsGreaterThanOne(
			String(
				(reviews.filter((review) => review.rating >= 1 && review.rating < 2)
					.length /
					reviews.length) *
					100
			) + "%"
		);
		console.log(
			"rrr",
			reviews.filter((review) => review.rating === 5)
		);
	}, [reviews]);
	return (
		<div className="flex justify-between mt-2">
			<div className="w-2/3">
				<h1 className="font-bold text-2xl">{product.name}</h1>

				<div className="flex items-center">
					<div className="flex items-center mr-2">
						<div>
							<Rating initialValue={1} iconsCount={1} readonly size={25} />
						</div>
						<div>({reviews.length > 0 ? product.ratings.toFixed(2) : "0"})</div>
					</div>
					<div>{product.reviews} Reviews</div>
				</div>
				<div>
					<img
						src={product.image?.url}
						className="w-[500px] h-[500px] object-contain"
						alt=""
					/>
				</div>
				<div className="flex">
					{product.sale > 0 ? (
						<>
							<div className="mr-2 font-semibold">
								Price $
								{(product.price - (product.sale * product.price) / 100).toFixed(
									2
								)}
							</div>
							<div className="mr-2 line-through font-semibold">
								$ {product.price}
							</div>
						</>
					) : (
						<div className="font-semibold">${product.price}</div>
					)}
				</div>
				<div>
					<h3 className="font-semibold text-2xl">Product Description</h3>
					<p>{product.description}</p>
				</div>
				<div>
					<h3 className="text-2xl font-semibold">Ratings and Reviews</h3>
					<h4 className="font-xl font-semibold">Ratings</h4>
					<div>
						<div>{reviews.length > 0 ? product.ratings.toFixed(2) : "0"}/5</div>
						<div>
							<Rating
								readonly
								iconsCount={5}
								initialValue={reviews.length > 0 ? product.ratings : "0"}
							/>
						</div>
						<div>
							<div className="flex items-center">
								<Rating readonly iconsCount={5} initialValue={5} size={25} />
								<div className="w-full mt-1">
									<div className="bg-slate-300 w-[200px] rounded-full h-[20px]">
										<div
											className={`bg-yellow-500 rounded-full h-[20px] transition-all ease duration-1000`}
											style={{ width: `${ratingsEqualToFive}` }}
										></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<Rating readonly iconsCount={5} initialValue={4} size={25} />
								<div className="w-full mt-1">
									<div className="bg-slate-300 w-[200px] rounded-full h-[20px]">
										<div
											className={`bg-yellow-500 rounded-full h-[20px] transition-all ease duration-1000`}
											style={{ width: `${ratingsGreaterThanFour}` }}
										></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<Rating readonly iconsCount={5} initialValue={3} size={25} />
								<div className="w-full mt-1">
									<div className="bg-slate-300 w-[200px] rounded-full h-[20px]">
										<div
											className={`bg-yellow-500 rounded-full h-[20px] transition-all ease duration-1000`}
											style={{ width: `${ratingsGreaterThanThree}` }}
										></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<Rating readonly iconsCount={5} initialValue={2} size={25} />
								<div className="w-full mt-1">
									<div className="bg-slate-300 w-[200px] rounded-full h-[20px]">
										<div
											className={`bg-yellow-500 rounded-full h-[20px] transition-all ease duration-1000`}
											style={{ width: `${ratingsGreaterThanTwo}` }}
										></div>
									</div>
								</div>
							</div>
							<div className="flex items-center">
								<Rating readonly iconsCount={5} initialValue={1} size={25} />
								<div className="w-full mt-1">
									<div className="bg-slate-300 w-[200px] rounded-full h-[20px]">
										<div
											className={`bg-yellow-500 rounded-full h-[20px] transition-all ease duration-1000`}
											style={{ width: `${ratingsGreaterThanOne}` }}
										></div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div>
						<h4 className="font-xl font-semibold mt-2">Reviews</h4>
						{reviews.map((review) => {
							return (
								<div className="mx-2 my-2 flex flex-col">
									<div className="flex">
										<div className="mr-1">
											<img
												src={review.user.image.url}
												className="w-[50px] h-[50px] object-cover"
												alt=""
											/>
										</div>
										<div className="flex flex-col">
											<div>
												{review.user.firstName} {review.user.lastName}
											</div>
											<div>{moment(review.createdAt).format("lll")}</div>
										</div>
									</div>
									<div className="my-1 m-[-4px]">
										<Rating
											customIcons={5}
											readonly
											size={25}
											initialValue={review.rating}
										/>
									</div>
									<div>{review.comment}</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>
			<div className="border w-1/3 mt-2 shadow-sm h-[500px]">
				<div className="flex justify-evenly  mt-8">
					<div className="w-[200px] text-center">
						<button
							onClick={handleBuyNow}
							className="bg-primary text-white p-2 px-10 active:p-[6px] active:px-[36px] mt-2 rounded-md font-semibold"
						>
							Buy Now
						</button>
					</div>
					<div className="w-[200px] text-center">
						<button
							onClick={handleAddToCart}
							className="bg-primary text-white p-2 px-10 active:p-[6px] active:px-[36px] mt-2 rounded-md font-semibold"
						>
							Add to Cart
						</button>
					</div>
					{/* 
					<button onClick={handleRemoveCartItem}>Remove from Cart</button> */}
				</div>
				<div className="flex flex-col items-center w-full mt-[50px]">
					<div className="flex items-center w-full justify-evenly mb-[60px]">
						<div>
							<AiOutlineHome className="text-[70px] text-primary" />
						</div>
						<div className="w-[200px] text-xl font-light text-center">
							Home Delivery Available
						</div>
					</div>
					<div className="flex items-center w-full justify-evenly">
						<div>
							<BsCurrencyDollar className="text-[70px] text-primary" />
						</div>
						<div className="w-[200px] text-xl font-light text-center">
							COD,Paypal and Stripe Available
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SingleProduct;
