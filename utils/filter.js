const filter = (conditions) => {
	conditions = JSON.stringify(conditions).replace(
		/\b(gt|gte|lt|lte)\b/g,
		(key) => `$${key}`
	);
	return JSON.parse(conditions);
};
module.exports = { filter };
