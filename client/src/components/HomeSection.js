import React from "react";
import { Link } from "react-router-dom";
import Product from "./common/Product";

const HomeSection = (props) => {
	const { title, products, count } = props;
	return (
		<>
			<div>
				<h2 className="col-span-2 text-4xl font-medium my-2 text-center w-full">
					{title}
				</h2>
				<div className="grid grid-cols-4 ">
					{products.slice(0, 5).map((product) => {
						return (
							<div className="col-span-1">
								<Product key={product._id} product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default HomeSection;
