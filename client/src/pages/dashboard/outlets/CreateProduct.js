import { useState } from "react";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
import validate from "../../../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RenderImage from "../../../components/common/RenderImage";

const CreateProduct = () => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState();
	const [stock, setStock] = useState();
	const [sale, setSale] = useState();
	const [published, setPublished] = useState(false);
	const [featured, setFeatured] = useState(false);

	const [isLoading, setIsLoading] = useState(false);
	// image
	const [imageBase64, setImageBase64] = useState("");
	const [image, setImage] = useState("");

	// errors
	const [formErrors, setFormErrors] = useState({
		nameErrors: [],
		decriptionErrors: [],
		priceErrors: [],
		stockErrors: [],
		saleErrors: [],
		imageErrors: [],
	});
	const {
		nameErrors,
		decriptionErrors,
		priceErrors,
		stockErrors,
		saleErrors,
		imageErrors,
	} = formErrors;
	const axiosPrivateInstance = useAxiosPrivate();

	const submitHandler = async (e) => {
		e.preventDefault();
		// console.log(formData);
		const dataToValidate = [
			{
				name: "Product Name",
				value: name,
				validate: ["string", "min:3", "required"],
			},
			{
				name: "Desciption",
				value: description,
				validate: ["required", "string", "max:1000", "min:10"],
			},
			{
				name: "Price",
				value: price,
				validate: ["required", "number", "min:0"],
			},
			{
				name: "Stock",
				value: stock,
				validate: ["required", "number", "min:1"],
			},
			{
				name: "Sale",
				value: sale,
				validate: ["number", "min:0"],
			},
			{
				name: "Image",
				value: imageBase64,
				validate: ["required", "string"],
			},
		];
		const validateErrors = validate(dataToValidate);
		setFormErrors({
			nameErrors: validateErrors[0],
			decriptionErrors: validateErrors[1],
			priceErrors: validateErrors[2],
			stockErrors: validateErrors[3],
			saleErrors: validateErrors[4],
			imageErrors: validateErrors[5],
		});
		if (validateErrors.flat().length > 0) {
			return;
		}
		try {
			setIsLoading(true);
			const response = axiosPrivateInstance.post("/products", {
				name,
				description,
				price,
				stock,
				sale,
				published,
				featured,
				image: imageBase64,
			});
			toast.promise(response, {
				pending: "Creating Product, Please wait...",
				success: "Product has been Created!",
				error: "Something went wrong!",
			});
			console.log(await response);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
		}
	};
	const handleImage = (e) => {
		setImage(e.target.value);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onloadend = () => {
			setImageBase64(reader.result);
		};
	};
	return (
		<section>
			<form onSubmit={submitHandler}>
				<div className="grid grid-cols-3 lg:grid-cols-3 gap-x-5 place-items-center">
					<div className="col-span-3 text-4xl font-bold my-2 w-full">
						Create Product
					</div>
					<div className="flex flex-col col-span-1 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Name
						</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className={`border border-gray-2 rounded w:full outline-gray-1 h-8 ${
								nameErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{nameErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="flex flex-col col-span-1 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Price
						</label>
						<input
							type="number"
							name="price"
							id="price"
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
							className={`border border-gray-2 rounded w:full outline-gray-1 h-8 ${
								priceErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{priceErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="flex flex-col col-span-1 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Stock
						</label>
						<input
							type="number"
							name="stock"
							id="stock"
							value={stock}
							onChange={(e) => setStock(Number(e.target.value))}
							className={`border border-gray-2 rounded w:full outline-gray-1 h-8 ${
								stockErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{stockErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="flex flex-col col-span-1 lg:col-span-1 w-full mb-3">
						<label htmlFor="" className="text-xl">
							Sale
						</label>
						<input
							type="number"
							name="sale"
							id="sale"
							value={sale}
							onChange={(e) => setSale(Number(e.target.value))}
							className={`border border-gray-2 rounded w:full outline-gray-1 h-8 ${
								saleErrors.length > 0 && "border-rose-500 border-2"
							}`}
						/>
						{saleErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="flex col-span-1 lg:col-span-1 w-full items-center">
						<input
							type="checkbox"
							name="published"
							id="published"
							checked={published}
							value={published}
							onChange={(e) => setPublished(!published)}
						/>
						<label htmlFor="" className="text-xl ml-2">
							Published
						</label>
					</div>
					<div className="flex col-span-1 lg:col-span-1 w-full  items-center">
						<input
							type="checkbox"
							name="featured"
							id="featured"
							checked={featured}
							value={featured}
							onChange={(e) => setFeatured(!featured)}
						/>
						<label htmlFor="" className="text-xl  ml-2">
							Featured
						</label>
					</div>
					<div className="flex flex-col col-span-3 lg:col-span-3  w-full mb-3">
						<label htmlFor="" className="text-xl">
							Description
						</label>
						<textarea
							name="decription"
							id="description"
							cols="20"
							rows="15"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							className={`border resize border-gray-2 rounded w-full outline-gray-1 ${
								decriptionErrors.length > 0 && "border-rose-500 border-2"
							}`}
						></textarea>
						{decriptionErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="col-span-2 w-full">
						{imageBase64.length > 0 && (
							<RenderImage image={image} imageBase64={imageBase64} />
						)}
					</div>
					<div className="col-span-2 w-full flex flex-col">
						<input
							type="file"
							name="image"
							id="image"
							value={image}
							onChange={handleImage}
							className="block w-full text-md text-gray-1
      									file:mr-4 file:py-2 file:px-4
      									file:rounded file:border-slate-200
      									file:text-sm file:font-semibold shadow-none hover:file:bg-slate-300
     									 file:bg-slate-200 file:text-gray-1"
						/>
						{imageErrors.map((err, i) => {
							return (
								<span className="text-rose-500" key={i}>
									{err}
								</span>
							);
						})}
					</div>
					<div className="col-span-3 w-full">
						<button
							type="submit"
							className="bg-primary text-white p-3 px-12 active:p-[10px] active:px-[40px] mt-2 rounded-md"
						>
							Submit
						</button>
						<ToastContainer
							position="bottom-center"
							autoClose={5000}
							hideProgressBar={false}
							newestOnTop={false}
							closeOnClick
							rtl={false}
							pauseOnFocusLoss
							draggable
							pauseOnHover
						/>
					</div>
				</div>
			</form>
		</section>
	);
};

export default CreateProduct;
