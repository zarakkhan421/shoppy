const validate = (dataToValidate) => {
	let formErrors = [];
	console.log(dataToValidate);
	dataToValidate.forEach((data) => {
		console.log(data);
		let dataErrors = [];
		// validate string
		if (data.validate.includes("string") && !data.validate.includes("match")) {
			if (data.validate.includes("required")) {
				if (data.value.length === 0) {
					dataErrors.push(data.name + " is required");
				}
			}
			if (typeof data.value !== "string" && data.value.length !== 0) {
				dataErrors.push(data.name + " is not a string");
			}
			// validate email
			if (data.validate.includes("email") && data.value.length !== 0) {
				if (
					!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
						data.value
					)
				) {
					dataErrors.push(data.name + " is not valid");
				}
			}

			//validate min string
			let minIndex = data.validate.findIndex((el) => el.startsWith("min"));
			if (minIndex > 0) {
				let min = data.validate[minIndex];
				let minValue = min.split(":")[1];
				if (data.value.length < Number(minValue) && data.value.length !== 0) {
					dataErrors.push(data.name + " should be minimum of " + minValue);
				}
			}
			// validate max string
			let maxIndex = data.validate.findIndex((el) => el.startsWith("max"));
			if (maxIndex > 0) {
				let max = data.validate[maxIndex];
				let maxValue = max.split(":")[1];
				if (data.value.length > Number(maxValue) && data.value.length !== 0) {
					dataErrors.push(data.name + " should be maximum of " + maxValue);
				}
			}
		}

		// validate match string
		if (data.validate.includes("match")) {
			if (data.validate.includes("required")) {
				if (data.value[0].length === 0) {
					dataErrors.push(data.name + " is required");
				}
			}
			if (data.value[1].length > 0 && data.value[0].length !== 0) {
				if (data.value[0] !== data.value[1]) {
					dataErrors.push(data.name + " do not match");
				}
			}
			//validate match min string
			let minIndex = data.validate.findIndex((el) => el.startsWith("min"));
			if (minIndex > 0) {
				let min = data.validate[minIndex];
				let minValue = min.split(":")[1];
				if (
					data.value[0].length < Number(minValue) &&
					data.value[0].length !== 0
				) {
					dataErrors.push(data.name + " should be minimum of " + minValue);
				}
			}
			// validate match max string
			let maxIndex = data.validate.findIndex((el) => el.startsWith("max"));
			if (maxIndex > 0) {
				let max = data.validate[maxIndex];
				let maxValue = max.split(":")[1];
				if (
					data.value[0].length > Number(maxValue) &&
					data.value[0].length !== 0
				) {
					dataErrors.push(data.name + " should be maximum of " + maxValue);
				}
			}
		}

		// validate number
		if (data.validate.includes("number")) {
			if (data.validate.includes("required")) {
				if (data.value === undefined) {
					dataErrors.push(data.name + " is required");
				}
			}
			if (isNaN(data.value) && data.value !== undefined) {
				dataErrors.push(data.name + " should be a number");
			}
			//validate min number
			let minIndex = data.validate.findIndex((el) => el.startsWith("min"));
			if (minIndex > 0) {
				let min = data.validate[minIndex];
				let minValue = min.split(":")[1];
				if (data.value < Number(minValue)) {
					dataErrors.push(data.name + " should be minimum of " + minValue);
				}
			}
			// validate max number
			let maxIndex = data.validate.findIndex((el) => el.startsWith("max"));
			if (maxIndex > 0) {
				let max = data.validate[maxIndex];
				let maxValue = max.split(":")[1];
				if (data.value > Number(maxValue)) {
					dataErrors.push(data.name + " should be maximum of " + maxValue);
				}
			}
		}
		console.log("data err", dataErrors);
		formErrors.push(dataErrors);
		console.log("form err", formErrors);
	});
	return formErrors;
};

export default validate;
