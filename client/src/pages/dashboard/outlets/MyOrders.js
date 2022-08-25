import { useState, useEffect } from "react";
import OrderSection from "../../../components/OrderSection";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const MyOrders = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [orders, setOrder] = useState([]);
	useEffect(() => {
		console.log("34");
		const getMyOrders = async () => {
			try {
				const response = await axiosPrivateInstance.get("orders/");
				console.log(response);
				setOrder(response.data.serverData.orders);
			} catch (error) {
				console.log(error);
			}
		};
		getMyOrders();
	}, []);
	return (
		<div>
			{orders.map((order) => {
				return <OrderSection order={order} key={order._id} />;
			})}
		</div>
	);
};

export default MyOrders;
