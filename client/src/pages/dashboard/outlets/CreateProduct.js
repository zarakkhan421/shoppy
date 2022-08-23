import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState(0);
	const [stock, setStock] = useState(0);
	const [sale, setSale] = useState(0);
	const [published, setPublished] = useState(false);
	const [featured, setFeatured] = useState(false);

	const axiosPrivateInstance = useAxiosPrivate();

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(formData);
		const response = await axiosPrivateInstance.post("/products", {
			name,
			description,
			price,
			stock,
			sale,
			published,
			featured,
		});
		console.log(response);
	};

	return (
		<section>
			<form onSubmit={submitHandler}>
				<label htmlFor="">Name</label>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<label htmlFor="">Description</label>
				<textarea
					name="decription"
					id="description"
					cols="30"
					rows="2"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></textarea>
				<label htmlFor="">Price</label>
				<input
					type="number"
					name="price"
					id="price"
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				/>
				<label htmlFor="">Stock</label>
				<input
					type="number"
					name="stock"
					id="stock"
					value={stock}
					onChange={(e) => setStock(e.target.value)}
				/>
				<label htmlFor="">Sale</label>
				<input
					type="number"
					name="sale"
					id="sale"
					value={sale}
					onChange={(e) => setSale(e.target.value)}
				/>
				<input
					type="checkbox"
					name="published"
					id="published"
					checked={published}
					value={published}
					onChange={(e) => setPublished(!published)}
				/>
				<label htmlFor="">Published</label>
				<input
					type="checkbox"
					name="featured"
					id="featured"
					checked={featured}
					value={featured}
					onChange={(e) => setFeatured(!featured)}
				/>
				<label htmlFor="">Featured</label>
				<button type="submit">Submit</button>
			</form>
		</section>
	);
};

export default CreateProduct;
