import React from "react";
import { Link } from "react-router-dom";

const HomeSection = (props) => {
	const { title, products, count } = props;
	return (
		<>
			<div>
				<h2 className="text-lg font-bold">{title}</h2>
				<span>{count}</span>
				<div className="flex">
					{products.slice(0, 5).map((product) => {
						return (
							<div className="m-4 border p-4 border-red-500" key={product._id}>
								<div> {product.name}</div>
								<div>{product.sale > 0 ? "on Sale" : ""}</div>
								<Link to={`/products/${product._id}`}>single</Link>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default HomeSection;
