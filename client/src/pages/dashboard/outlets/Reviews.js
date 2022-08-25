import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const Reviews = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPrivateInstance = useAxiosPrivate();

	useEffect(() => {
		const getAllReviews = async () => {
			try {
				const reviews = await axiosPrivateInstance.get("/reviews");
				console.log(reviews);
			} catch (error) {
				console.log(error);
			}
		};
		getAllReviews();
	});
	return <div>Reviews</div>;
};

export default Reviews;
