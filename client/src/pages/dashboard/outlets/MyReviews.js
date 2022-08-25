import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const MyReviews = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPrivateInstance = useAxiosPrivate();
	useEffect(() => {
		const getReviews = async () => {
			try {
				const response = await axiosPrivateInstance.get("/reviews");
				console.log(response);
				setReviews(response.data.serverData.reviews);
			} catch (error) {
				console.log(error);
			}
		};
		getReviews();
	}, []);

	const deleteHandler = () => {};
	return (
		<div>
			<h2>My Reviews</h2>
			{reviews.map((review) => {
				return (
					<div className="flex">
						<div className="flex flex-col">
							<div>{review.product.name}</div>
							<div>{review.createdAt}</div>
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
							<div className="flex">
								<div>
									<Link to={`/dashboard/reviews/edit/${review._id}`}>Edit</Link>
								</div>
								<div>
									<form onSubmit={deleteHandler}>
										<button type="submit">Delete</button>
									</form>
								</div>
							</div>
						</div>
						<div>comment</div>
					</div>
				);
			})}
		</div>
	);
};

export default MyReviews;
