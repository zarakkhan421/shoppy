import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import moment from "moment";
import { Rating } from "react-simple-star-rating";
import validate from "../../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { getFirstName, getLastName } from "../../../features/userSlice";
// reviews will created based on order _id it and orderitem _id generated in array, so that only ordered products will be reviewed
const CreateReview = () => {
	const params = useParams();
	const axiosPrivateInstance = useAxiosPrivate();
	console.log("params", params);
	const orderItemId = params.order_item;
	const [orderItem, setOrderItem] = useState({});
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const firstName = useSelector(getFirstName);
	const lastName = useSelector(getLastName);
	//error
	const [commentErrors, setCommentErrors] = useState([]);
	const [ratingErrors, setRatingErrors] = useState([]);
	useEffect(() => {
		const getOrderItem = async () => {
			try {
				const response = await axiosPrivateInstance.get(
					`/order-items/${orderItemId}`
				);
				console.log(response);
				setOrderItem(response.data.serverData.orderItem);
			} catch (error) {
				console.log(error);
			}
		};
		getOrderItem();
	}, []);

	// useEffect(() => {
	// 	console.log("len", Object.keys(order).length);
	// 	setOrderItem(
	// 		Object.keys(order).length > 0 &&
	// 			order.orderItems.filter((orderItem) => orderItem._id === orderItemId)[0]
	// 	);
	// }, [order]);

	console.log("order item ", orderItem);
	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		const dataToValidate = [
			{
				name: "Comment",
				validate: ["string", "min:10", "max:1000"],
				value: comment,
			},
			{
				name: "Rating",
				validate: ["required", "number"],
				value: rating,
			},
		];
		const validateErrors = validate(dataToValidate);
		setCommentErrors(validateErrors[0]);
		setRatingErrors(validateErrors[1]);
		if (validateErrors.flat().length > 0) {
			return;
		}
		const data = {
			productName: orderItem.name,
			reviewerName: firstName + " " + lastName,
			comment,
			rating,
		};
		try {
			const response = axiosPrivateInstance.post(
				`/reviews/${orderItem.product._id}`,
				data
			);
			toast.promise(response, {
				pending: "Creating review, Please wait...",
				success: "Review has been Created!",
			});
			const resolved = await response;
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div>
			<h2 className="my-2 text-4xl font-bold">Write A Review</h2>
			<div className="flex ">
				<div className="mr-3">
					<img
						src={orderItem.product?.image.url}
						alt=""
						className="w-[350px] h-[350px] object-cover"
					/>
				</div>
				<div>
					<div className="font-medium text-xl">{orderItem.name}</div>
					<div className="font-medium text-xl">Price: {orderItem.price}</div>
					<div className="">
						<span className="font-medium text-xl mr-2"> Delivered On:</span>
						<span className="font-medium text-xl">
							{orderItem.deliveredAt &&
								moment(orderItem.deliveredAt).format("ll")}
						</span>
					</div>
				</div>
			</div>
			<div>
				<form onSubmit={handleReviewSubmit}>
					<div>
						<div className="font-medium text-xl">Rate this Product</div>
						<div>
							<Rating
								transition
								allowHalfIcon
								onClick={(rate) => setRating(rate / 20)}
								ratingValue={rating}
							/>
						</div>
						{ratingErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<textarea
						name="review"
						id="review"
						cols="50"
						rows="10"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
						className={`border resize border-gray-2 rounded w-2/3 outline-gray-1 ${
							commentErrors.length > 0 && "border-rose-500 border-2"
						}`}
					></textarea>
					{commentErrors.map((err, i) => {
						return (
							<span className="text-rose-500 block mb-2" key={i}>
								{err}
							</span>
						);
					})}
					<button
						type="submit"
						className="block bg-primary px-8 py-2 active:p-1 active:px-6 text-white rounded"
					>
						Review
					</button>
				</form>
			</div>
			<ToastContainer
				position="bottom-center"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</div>
	);
};

export default CreateReview;
