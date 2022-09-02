import moment from "moment";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import validate from "../../../utils/validate";

const EditReview = () => {
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");
	const [review, setReview] = useState({});
	const axiosPrivateInstance = useAxiosPrivate();
	const params = useParams(); //error
	const [commentErrors, setCommentErrors] = useState([]);
	const [ratingErrors, setRatingErrors] = useState([]);
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
		// <div>
		// 	<h2 className="my-2 text-4xl font-bold">Edit Review</h2>
		// 	<div className="flex">
		// 		<div className="mr-3">
		// 			<img
		// 				src={review.product?.image.url}
		// 				alt=""
		// 				className="w-[250px] h-[250px] object-cover"
		// 			/>
		// 		</div>
		// 	</div>
		// 	<div>
		// 		<form onSubmit={handleReviewSubmit}>
		// 			<div>
		// 				<div>Rate this Product</div>
		// 				<div>
		// 					<Rating
		// 						transition
		// 						allowHalfIcon
		// 						onClick={(rate) => setRating(rate / 20)}
		// 						ratingValue={rating * 20}
		// 					/>
		// 				</div>
		// 			</div>
		// 			<textarea
		// 				name="review"
		// 				id="review"
		// 				cols="50"
		// 				rows="10"
		// 				value={comment}
		// 				onChange={(e) => setComment(e.target.value)}
		// 			></textarea>
		// 			<button type="submit">Review</button>
		// 		</form>
		// 	</div>
		// </div><div>
		<div>
			<h2 className="my-2 text-4xl font-bold">Edit Review</h2>
			<div className="flex ">
				<div className="mr-3">
					<img
						src={review.product?.image.url}
						alt=""
						className="w-[350px] h-[350px] object-cover"
					/>
				</div>
				<div>
					<div className="font-medium text-xl">{review.name}</div>
					{/* <div className="font-medium text-xl">Price: {review.price}</div>
					<div className="">
						<span className="font-medium text-xl mr-2"> Delivered On:</span>
						<span className="font-medium text-xl">
							{review.deliveredAt && moment(review.deliveredAt).format("ll")}
						</span>
					</div> */}
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
								ratingValue={rating * 20}
								onClick={(rate) => setRating(rate / 20)}
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
						className={`border resize border-gray-2 rounded mt-2 w-2/3 outline-gray-1 ${
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
		</div>
	);
};

export default EditReview;
