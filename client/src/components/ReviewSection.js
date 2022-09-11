import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ReviewSection = (props) => {
	const isAll = props.isAll;
	const axiosPrivateInstance = useAxiosPrivate();
	const [reviews, setReviews] = useState([]);
	console.log(props.reviews);
	const deleteHandler = async (e, id) => {
		e.preventDefault();
		console.log("dddid", id);
		try {
			const response = axiosPrivateInstance.delete(`/reviews/${id}`);
			toast.promise(response, {
				pending: "Deleting Review, Please wait...",
				success: "Review has been Deleted!",
			});
			const resolved = await response;
			if (resolved.data.success)
				setReviews(reviews.filter((deleteReview) => deleteReview._id !== id));
		} catch (error) {
			toast.error(error.response.data.message);
			console.log(error);
		}
	};
	console.log("reviewsection");
	useEffect(() => {
		setReviews(
			props.reviews.map((review) => ({ ...review, deleteChecked: false }))
		);
	}, [props.reviews]);
	return (
		<>
			{reviews &&
				reviews.map((review) => {
					return (
						<div
							key={review._id}
							className="relative flex bg-slate-50 px-2 py-5 rounded mb-3 shadow-sm hover:shadow"
						>
							<div className="flex flex-col mr-4">
								<div className="text-2xl font-medium">
									{review.product?.name
										? review.product.name
											? review.productName
											: review.productName
										: "no longer exist"}
								</div>
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
											{/* <form onSubmit={(e) => deleteHandler(e, review._id)}> */}
											<button
												type="submit"
												onClick={() =>
													setReviews(
														reviews &&
															reviews.map((deleteReview) => {
																console.log(review);
																return deleteReview._id === review._id
																	? {
																			...deleteReview,
																			deleteChecked: true,
																	  }
																	: { ...deleteReview };
															})
													)
												}
												className="text-red-400"
											>
												Delete
											</button>
											{/* </form> */}
										</div>
									</div>
								)}
							</div>
							<div>{review.comment}</div>
							{review.deleteChecked && (
								<div className="fixed backdrop-blur-sm top-0 left-0 flex w-full h-full items-center justify-center">
									<div className=" flex flex-col w-[95%] h-[95%] bg-slate-100/50 items-center justify-center">
										<p className="font-medium">Are you Sure?</p>
										<div className="flex">
											<form onSubmit={(e) => deleteHandler(e, review._id)}>
												<button
													type="submit"
													className="mr-4 bg-primary text-white p-2 px-10 active:p-[8px] active:px-[32px] mt-2 rounded-md"
												>
													Delete
												</button>
											</form>
											<button
												className="mr-4 bg-slate-200 text-gray-800 p-2 px-10 active:p-[8px] active:px-[32px] mt-2 rounded-md"
												onClick={() =>
													setReviews(
														reviews &&
															reviews.map((deleteReview) => {
																console.log(review);
																return deleteReview._id === review._id
																	? {
																			...deleteReview,
																			deleteChecked: false,
																	  }
																	: { ...deleteReview };
															})
													)
												}
											>
												Cancel
											</button>
										</div>
									</div>
								</div>
							)}
						</div>
					);
				})}
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
		</>
	);
};

export default ReviewSection;
