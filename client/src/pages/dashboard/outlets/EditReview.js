import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const EditReview = () => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [review, setReview] = useState({});
	const axiosPrivateInstance = useAxiosPrivate();
	const params = useParams();
	useEffect(() => {
		const getReview = async () => {
			try {
				const response = await axiosPrivateInstance.get(
					`/reviews/${params.id}`
				);
				setReview(response.data.serverData.review);
				setComment(response.data.serverData.review.comment);
				setRating(response.data.serverData.review.rating);
				console.log(response);
			} catch (error) {
				console.log(error);
			}
		};
		getReview();
	}, []);

	const handleReviewSubmit = async (e) => {
		e.preventDefault();
		const data = {
			comment,
			rating,
		};
		try {
			const response = await axiosPrivateInstance.put(
				`reviews/${params.id}`,
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
					<div>{review.product?.name}</div>
					<div>Price: {review.product?.price}</div>
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
								ratingValue={rating * 20}
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

export default EditReview;
