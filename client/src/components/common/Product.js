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
					<div>
						<img
							className="w-[350px] h-[350px] object-scale-down"
							src={product.image.url}
							alt=""
						/>
					</div>
					<div> {product.name}</div>
					<div className="flex">
						<div>$ {product.price} </div>

						<div className="flex">
							<AiFillStar className="text-red-500 mt-1" />({product.ratings})
						</div>
						<div>{product.reviews} Reviews</div>
					</div>
				</div>
			</Link>
		</>
	);
};

export default Product;
