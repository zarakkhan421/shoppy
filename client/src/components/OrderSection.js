import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserId } from "../features/userSlice";
const OrderSection = (props) => {
	console.log("sd", props);
	const userId = useSelector(getUserId);
	const { order, isAll } = props;
	return (
		<div className="bg-slate-200 mb-2">
			<div>{moment(order.createdAt).format("DD MMM, YYYY")}</div>
			{order.orderItems.map((orderItem, i) => {
				return (
					<div className="flex flex-col mb-3">
						<div>Order Item {i + 1}</div>
						<div className="flex">
							<div>picture</div>
							<div className="flex">
								<div>{orderItem.name}</div>
								<div>Quantity:{orderItem.quantity}</div>
								<div>Status:{orderItem.orderStatus}</div>
							</div>
						</div>
						{/* order status bar */}
						<div>ٌorder status bar</div>
						<div className="flex">
							<div>Price:{orderItem.price}</div>
							{isAll && (
								<Link
									to={`/dashboard/orders/status/${order._id}/${orderItem._id}`}
								>
									Change Order Status
								</Link>
							)}

							{!isAll && (
								<Link
									to={`/dashboard/reviews/create/${order._id}/${orderItem._id}`}
								>
									Review this Product
								</Link>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OrderSection;
