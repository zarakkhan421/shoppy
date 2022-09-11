import { useState, useEffect } from "react";
import OrderSection from "../../../components/OrderSection";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
const MyOrders = () => {
	const axiosPrivateInstance = useAxiosPrivate();
	const [orders, setOrders] = useState([]);
	const [noOfPages, setNoOfPages] = useState(0);
	const [page, setPage] = useState(1);
	useEffect(() => {
		console.log("34");
		const getMyOrders = async () => {
			try {
				const response = await axiosPrivateInstance.get(`orders/?page=${page}`);
				console.log(response);
				setOrders(response.data.serverData.orders);
				setNoOfPages(
					Math.ceil(
						response.data.serverData.count /
							response.data.serverData.resultPerPage
					)
				);
			} catch (error) {
				console.log(error);
			}
		};
		getMyOrders();
	}, [page]);
	return (
		<div>
			<h2 className="my-2 text-4xl font-bold">My Orders</h2>
			{orders.map((order) => {
				return <OrderSection order={order} key={order._id} />;
			})}{" "}
			<div className="flex justify-center mt-8 w-full">
				<button
					className="text-blue-500 disabled:text-slate-400 mr-2"
					disabled={page === 1}
					onClick={() => setPage((page) => page - 1)}
				>
					Previous
				</button>
				{[...Array(noOfPages)].map((_, i) => {
					return (
						<button
							key={i}
							className={`mr-2 px-2 py-1 rounded-sm ${
								page === i + 1 ? "bg-primary text-white" : ""
							}`}
							onClick={(e) => setPage(i + 1)}
						>
							{i + 1}
						</button>
					);
				})}
				<button
					className="text-blue-500 disabled:text-slate-400 ml-1"
					onClick={() => setPage((page) => page + 1)}
					disabled={page === noOfPages}
				>
					Next
				</button>
			</div>
		</div>
	);
};

export default MyOrders;
