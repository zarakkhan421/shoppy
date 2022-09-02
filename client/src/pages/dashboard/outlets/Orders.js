import { useState, useEffect } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import OrderSection from "../../../components/OrderSection";
const AllOrders = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const getOrders = async () => {
			try {
				const response = await axiosPrivateInstance.get("/orders/all");
				console.log(response);
				setOrders(response.data.serverData.orders);
			} catch (error) {
				console.log(error);
			}
		};
		getOrders();
	}, []);

	return (
		<div>
			<h2 className="my-2 text-4xl font-bold">Orders</h2>
			{orders.map((order) => {
				return <OrderSection order={order} key={order._id} isAll />;
			})}
		</div>
	);
};

export default AllOrders;
