import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const ReviewSection = (props) => {
	const { isAll, reviews } = props;
	const axiosPrivateInstance = useAxiosPrivate();

	const deleteHandler = async (e, id) => {
		e.preventDefault();
		console.log("dddid", id);
		try {
			const response = await axiosPrivateInstance.delete(`/reviews/${id}`);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};
	console.log("reviewsection");
	return (
		<div>
			{reviews.map((review) => {
				return (
					<div key={review._id} className="flex">
						<div className="flex flex-col">
							<div>{review.product.name}</div>
							<div>
								By: {review.user.firstName + " " + review.user.lastName}
							</div>
							<div>
								rating
								<Rating
									readonly
									allowHover={false}
									ratingValue={review.rating * 20}
								/>
							</div>
							{!isAll && (
								<div className="flex">
									<div>
										<Link to={`/dashboard/reviews/edit/${review._id}`}>
											Edit
										</Link>
									</div>
									<div>
										<form onSubmit={(e) => deleteHandler(e, review._id)}>
											<button type="submit">Delete</button>
										</form>
									</div>
								</div>
							)}
						</div>
						<div>{review.comment}</div>
					</div>
				);
			})}
		</div>
	);
};

export default ReviewSection;
