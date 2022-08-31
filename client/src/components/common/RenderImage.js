import React from "react";
import avatar from "../../assets/images/avatar.png";
import avatar2 from "../../assets/images/avatar2.png";

const RenderImage = (props) => {
	const { image, imageBase64 } = props;
	let imageSrc;

	if (imageBase64.length > 0) {
		imageSrc = imageBase64;
	} else if (image === undefined) {
		imageSrc = avatar;
	} else if (image?.url?.length > 0 && imageBase64.length === 0) {
		imageSrc = image.url;
	} else if (image?.url?.length === 0 && imageBase64.length === 0) {
		imageSrc = avatar;
	}

	return (
		<div>
			<img
				src={imageSrc}
				alt="img"
				style={{ width: "250px", height: "auto" }}
				onError={(e) => (e.currentTarget.src = avatar2)}
			/>
		</div>
	);
};

export default RenderImage;
