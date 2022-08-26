import React from "react";
import { Link } from "react-router-dom";
import Product from "./common/Product";

const HomeSection = (props) => {
	const { title, products, count } = props;
	return (
		<>
			<div>
				<h2 className="text-lg font-bold">{title}</h2>
				<span>{count}</span>
				<div className="flex">
					{products.slice(0, 5).map((product) => {
						return <Product key={product._id} product={product} />;
					})}
				</div>
			</div>
		</>
	);
};

export default HomeSection;
