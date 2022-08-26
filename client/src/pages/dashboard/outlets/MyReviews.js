import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import ReviewSection from "../../../components/ReviewSection";

const MyReviews = () => {
	const [reviews, setReviews] = useState([]);
	const axiosPrivateInstance = useAxiosPrivate();

	const getReviews = async () => {
		try {
			const response = await axiosPrivateInstance.get("/reviews");
			console.log(response);
			setReviews(response.data.serverData.reviews);
		} catch (error) {
			console.log(error);
		}
	};
	console.log("my");
	useEffect(() => {
		getReviews();
	}, []);

	return (
		<div>
			<h2>My Reviews</h2>
			<ReviewSection reviews={reviews} />
		</div>
	);
};

export default MyReviews;
