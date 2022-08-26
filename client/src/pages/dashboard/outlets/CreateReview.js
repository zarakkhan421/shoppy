import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import moment from "moment";
import { Rating } from "react-simple-star-rating";

// reviews will created based on order _id it and orderitem _id generated in array, so that only ordered products will be reviewed
const CreateReview = () => {
	const params = useParams();
	const axiosPrivateInstance = useAxiosPrivate();
	console.log("params", params);
	const orderId = params.order;
	const orderItemId = params.item;
	const [order, setOrder] = useState({});
	const [orderItem, setOrderItem] = useState({});
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		const getOrder = async () => {
			try {
				const response = await axiosPrivateInstance.get(`/orders/${orderId}`);
				console.log(response);
				setOrder(response.data.serverData.order);
			} catch (error) {
				console.log(error);
			}
		};
		getOrder();
	}, []);

	useEffect(() => {
		console.log("len", Object.keys(order).length);
		setOrderItem(
			Object.keys(order).length > 0 &&
				order.orderItems.filter((orderItem) => orderItem._id === orderItemId)[0]
		);
	}, [order]);

	console.log("order item ", orderItem);
	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		const data = {
			comment,
			rating,
		};
		try {
			const response = await axiosPrivateInstance.post(
				`/reviews/${orderItem.product._id}`,
				data
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2>Write A Review</h2>
			<div className="flex">
				<div>picture</div>
				<div>
					<div>{orderItem.name}</div>
					<div>Price: {orderItem.product?.price}</div>
				</div>
			</div>
			<div>
				<form onSubmit={handleReviewSubmit}>
					<div>
						<div>Rate this Product</div>
						<div>
							<Rating
								transition
								allowHalfIcon
								onClick={(rate) => setRating(rate / 20)}
								ratingValue={rating}
							/>
						</div>
					</div>
					<textarea
						name="review"
						id="review"
						cols="50"
						rows="10"
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					></textarea>
					<button type="submit">Review</button>
				</form>
			</div>
		</div>
	);
};

export default CreateReview;
