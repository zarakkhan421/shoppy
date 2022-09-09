require("dotenv").config();
const cloudinary = require("cloudinary").v2;
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (image) => {
	try {
		const cloudinaryResponse = await cloudinary.uploader.upload(image, {
			upload_preset: "shoppy",
			allowed_formats: ["jpeg", "jpg", "png"],
		});
		return {
			cloudinaryResponse,
			imageResponse: {
				id: cloudinaryResponse.public_id,
				url: cloudinaryResponse.secure_url,
			},
		};
	} catch (error) {
		return error;
	}
};

const updateImage = async (image, onDbExists) => {
	// check if user image exist in case first time upload
	try {
		const onCloudinaryExists = await cloudinary.search
			.expression(`public_id=${onDbExists.image.id}`)
			.execute();

		if (onCloudinaryExists.total_count > 0) {
			try {
				await cloudinary.uploader.destroy(onDbExists.image.id);
			} catch (cloudinaryResponse) {
				return { cloudinaryResponse };
			}
		}
	} catch (cloudinaryResponse) {
		return { cloudinaryResponse };
	}
	const { cloudinaryResponse, imageResponse } = await uploadImage(image);
	return {
		cloudinaryResponse,
		imageResponse,
	};
};

const deleteImage = async (id) => {
	try {
		const cloudinaryResponse = await cloudinary.uploader.destroy(id);
		return { cloudinaryResponse };
	} catch (cloudinaryResponse) {
		return { cloudinaryResponse };
	}
};

module.exports = { cloudinary, uploadImage, updateImage, deleteImage };
