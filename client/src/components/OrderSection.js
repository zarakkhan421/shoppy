import { useEffect, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserId } from "../features/userSlice";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const OrderSection = (props) => {
	console.log("sd", props);
	const userId = useSelector(getUserId);
	const { order, isAll } = props;
	const axiosPrivateInstance = useAxiosPrivate();
	const [orderItems, setOrderItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		const getOrderItems = async () => {
			try {
				const response = await axiosPrivateInstance.get(
					`/order-items/order/${order._id}`
				);
				console.log(response);
				setOrderItems(response.data.serverData.orderItems);
			} catch (error) {
				console.log(error);
			}
		};
		getOrderItems();
	}, []);
	return (
		<div className="mb-2 pt-2  border-b-2 pb-2 border-dotted border-gray-1 last:border-0">
			<div className="text-2xl font-semibold">
				{moment(order.createdAt).format("DD MMM, YYYY")}
			</div>
			{orderItems.map((orderItem, i) => {
				return (
					<div key={orderItem._id} className="flex flex-col">
						<div className="font-medium text-xl">Order Item {i + 1}</div>
						<div className="flex">
							<div>
								<img
									src={orderItem.product.image.url}
									className="w-[200px] h-[200px] object-cover"
									alt=""
								/>
							</div>
							<div className="flex flex-col">
								<div className="flex">
									<div className="font-medium text-lg mx-2">
										{orderItem.name}
									</div>
									<div className="font-medium text-lg mr-2">
										Quantity: {orderItem.quantity}
									</div>
									<div className="flex">
										<div className="font-medium text-lg mr-2">Status: </div>
										<div
											className={`font-medium text-lg ${
												orderItem.orderStatus === "cancelled" && "text-red-600"
											} ${
												orderItem.orderStatus === "processing" &&
												"text-yellow-500"
											} ${
												orderItem.orderStatus === "shipped" && "text-orange-500"
											} ${
												orderItem.orderStatus === "delivered" &&
												"text-green-600"
											}`}
										>
											{" " +
												orderItem.orderStatus[0].toUpperCase() +
												orderItem.orderStatus.slice(1)}
										</div>
									</div>
								</div>
								<div className="mx-2 my-10 flex items-center">
									{/* processing */}
									<div
										className={`rounded-full transition-all ease duration-[2500ms] w-4 h-4 ${
											isLoading ? "bg-transparent" : "bg-primary"
										} z-10`}
									></div>
									{/* end processing */}
									{/* shipped */}
									<div
										className={`${
											isLoading ? "w-0" : "w-80"
										}  transition-all ease duration-1000 h-1 m-[-2px] z-0 ${
											orderItem.orderStatus === "shipped" ||
											orderItem.orderStatus === "delivered"
												? "bg-primary"
												: "bg-gray-2"
										}`}
									></div>
									<div
										className={`rounded-full transition-all ease duration-[2500ms] w-4 h-4 z-10 ${
											isLoading
												? "bg-transparent"
												: orderItem.orderStatus === "shipped" ||
												  orderItem.orderStatus === "delivered"
												? "bg-primary"
												: "bg-gray-2"
										}`}
									></div>
									{/* end shipped */}
									{/* delivered */}
									<div
										className={`${
											isLoading ? "w-0" : "w-80"
										} h-1 m-[-2px] z-0 ${
											orderItem.orderStatus === "delivered"
												? "bg-primary"
												: "bg-gray-2"
										}`}
									></div>
									<div
										className={`rounded-full transition-all ease duration-[2500ms] w-4 h-4 z-10 ${
											isLoading
												? "bg-transparent"
												: orderItem.orderStatus === "delivered"
												? "bg-primary"
												: "bg-gray-2"
										}`}
									></div>
									{/* end delivered */}
								</div>
								<div className="mx-2 flex w-full justify-between">
									<div>
										<div>Processing</div>
										<div>
											{moment(orderItem.createdAt).format("DD MMM, YYYY")}
										</div>
									</div>
									<div className="flex flex-col items-center">
										<div>Shipped</div>
										<div>
											{moment(orderItem.shippedAt).format("DD MMM, YYYY")}
										</div>
									</div>
									<div className="flex flex-col items-end">
										<div>{`${
											orderItem.orderStatus === "cancelled"
												? "Cancelled"
												: "Delivered"
										}`}</div>
										<div>
											{orderItem.orderStatus === "cancelled"
												? moment(orderItem.deliveredAt).format("DD MMM, YYYY")
												: moment(orderItem.cancelledAt).format("DD MMM, YYYY")}
										</div>
									</div>
								</div>
								<div className="mx-2 flex items-center">
									<div className="font-semibold text-lg mr-2">
										Price: {orderItem.price}
									</div>
									{isAll && (
										<div>
											<Link
												to={`/dashboard/orders/status/${orderItem._id}`}
												className="text-blue-500"
											>
												Change Order Status
											</Link>
										</div>
									)}{" "}
									{!isAll && (
										<Link
											to={`/dashboard/reviews/create/${orderItem._id}`}
											className="text-blue-500"
										>
											Review this Product
										</Link>
									)}
								</div>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OrderSection;
