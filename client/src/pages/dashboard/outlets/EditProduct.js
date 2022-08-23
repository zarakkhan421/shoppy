import React from "react";
import { Outlet, useParams } from "react-router-dom";

const EditProduct = () => {
	const { id } = useParams();
	console.log(id);
	return <div>EditProducts</div>;
};

export default EditProduct;
