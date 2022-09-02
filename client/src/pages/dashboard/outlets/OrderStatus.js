import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const OrderStatus = () => {
	const [status, setStatus] = useState();
	const axiosPrivateInstance = useAxiosPrivate();
	const params = useParams();
	const { id } = params;
	console.log();
	const statusHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosPrivateInstance.put(
				`order-items/${status}/${id}`
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<h2 className="text-4xl font-bold my-2">Change Status</h2>
			<form onSubmit={statusHandler}>
				<div className="flex flex-col  w-full mb-3">
					<label htmlFor="" className="text-xl">
						Select Status:
					</label>
					<select
						name="status"
						id="status"
						value={status}
						onChange={(e) => setStatus(e.target.value)}
						className="border border-gray-2 rounded w:full outline-gray-1 h-8"
					>
						<option>Choose Status</option>
						<option value="shipped">Shipped</option>
						<option value="delivered">Delivered</option>
						<option value="cancelled">Cancelled</option>
					</select>
				</div>
				<button
					type="submit"
					className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
				>
					Change Status
				</button>
			</form>
		</div>
	);
};

export default OrderStatus;
