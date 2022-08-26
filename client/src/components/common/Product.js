import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";

const Product = (props) => {
	const { product } = props;
	return (
		<div className="m-4 border p-4 border-red-500" key={product._id}>
			<Link to={`/products/${product._id}`}>
				<div>thumnail</div>
				<div> {product.name}</div>
				<div className="flex justify-between">
					<div>$ {product.price} </div>

					<div className="flex">
						<AiFillStar className="text-red-500 mt-1" />({product.ratings})
					</div>
					<div>{product.reviews} Reviews</div>
				</div>
			</Link>
		</div>
	);
};

export default Product;
