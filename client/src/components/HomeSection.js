import React from "react";
import { Link } from "react-router-dom";
import Product from "./common/Product";

const HomeSection = (props) => {
	const { title, products, count, classes } = props;
	return (
		<>
			<div className={`${classes}`}>
				<h2 className="col-span-2 text-4xl font-medium my-2 text-center w-full mb-6 mt-2">
					{title}
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-3">
					{products.slice(0, 8).map((product) => {
						return (
							<div className="col-span-1" key={product._id}>
								<Product product={product} />
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
};

export default HomeSection;
