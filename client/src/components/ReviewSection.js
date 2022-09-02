import moment from "moment";
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
		<>
			{reviews.map((review) => {
				return (
					<div
						key={review._id}
						className="flex bg-slate-50 px-2 py-5 rounded mb-3 shadow-sm hover:shadow"
					>
						<div className="flex flex-col mr-4">
							<div className="text-2xl font-medium">{review.product.name}</div>
							<div className="font-semibold text-sm">
								{moment(review.createdAt).format("ll")}
							</div>
							<div className="text-md">
								By: {review.user.firstName + " " + review.user.lastName}
							</div>
							<div className="ml-[-3px]">
								<Rating
									readonly
									allowHover={false}
									ratingValue={review.rating * 20}
									size={25}
								/>
							</div>
							{!isAll && (
								<div className="flex">
									<div className="mr-2">
										<Link
											to={`/dashboard/reviews/edit/${review._id}`}
											className="text-blue-400"
										>
											Edit
										</Link>
									</div>
									<div>
										<form onSubmit={(e) => deleteHandler(e, review._id)}>
											<button type="submit" className="text-red-400">
												Delete
											</button>
										</form>
									</div>
								</div>
							)}
						</div>
						<div>{review.comment}</div>
					</div>
				);
			})}
		</>
	);
};

export default ReviewSection;
