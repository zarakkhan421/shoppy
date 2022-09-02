import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ReviewSection from "../../../components/ReviewSection";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPrivateInstance = useAxiosPrivate();

	useEffect(() => {
		const getAllReviews = async () => {
			try {
				const response = await axiosPrivateInstance.get("/reviews/all");
				console.log(response);
				setReviews(response.data.serverData.reviews);
			} catch (error) {
				console.log(error);
			}
		};
		getAllReviews();
	}, []);
	return (
		<div>
			<h2 className="my-2 text-4xl font-bold">All Reviews</h2>
			<ReviewSection reviews={reviews} isAll />
		</div>
	);
};

export default Reviews;
