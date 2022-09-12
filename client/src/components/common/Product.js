import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const Product = (props) => {
	const { product } = props;
	return (
		<>
			<Link to={`/products/${product._id}`}>
				<div
					className="flex flex-col shadow hover:shadow-md  p-2"
					key={product._id}
				>
					<div className="flex flex-col relative">
						<img
							className="w-[350px] h-[350px] object-scale-down"
							src={product.image.url}
							alt=""
						/>
						{product.sale > 0 && (
							<div className="w-[70px] h-[70px] flex items-center justify-evenly absolute bottom-0 bg-yellow-300/70 font-medium text-sm text-gray-1 rounded-full self-end">
								{product.sale} % off
							</div>
						)}
					</div>
					<div className="min-w-full h-[20px] overflow-hidden">
						{product.name.trim()}...
					</div>
					<div className="flex">
						<div className="flex">
							{product.sale > 0 ? (
								<>
									<div className="mr-2">
										$
										{(
											product.price -
											(product.sale * product.price) / 100
										).toFixed(2)}
									</div>
									<div className="mr-2 line-through">${product.price}</div>
								</>
							) : (
								<div className="mr-2">${product.price.toFixed(2)}</div>
							)}
						</div>

						<div className="flex mr-2">
							<AiFillStar className="text-red-500 mt-1" />(
							{product.ratings.toFixed(2)})
						</div>
						<div>{product.reviews} Reviews</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default Product;
