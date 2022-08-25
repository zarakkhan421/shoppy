import { useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const OrderStatus = () => {
	const [status, setStatus] = useState();
	const axiosPrivateInstance = useAxiosPrivate();
	const params = useParams();
	const { id, item } = params;
	console.log();
	const statusHandler = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosPrivateInstance.put(
				`orders/${status}/${id}/${item}`
			);
			console.log(response);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<form onSubmit={statusHandler}>
				<label htmlFor="">Change Status:</label>
				<select
					name="status"
					id="status"
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option>Choose Status</option>
					<option value="shipped">Shipped</option>
					<option value="delivered">Delivered</option>
					<option value="cancelled">Cancelled</option>
				</select>
				<button type="submit">Change Status</button>
			</form>
		</div>
	);
};

export default OrderStatus;
