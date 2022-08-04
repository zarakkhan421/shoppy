// takes query in uri ?price[gt]&price[gte]&price[lt]&price[lte] -> price ={gt=x,gte=y,lt=z,lte=zz} which id an object; converts it to JSON using Json Stringify
// then replace it gt -> $gt and so on in string for every condition in object after that again coverts the string to that is valid JSON to object
// that can be used as database query conditions
// same strategy can be used for other database filtration where equality or in equality is concerned "gt, gte, lt and lte"
const filter = (conditions) => {
	conditions = JSON.stringify(conditions).replace(
		/\b(gt|gte|lt|lte)\b/g,
		(key) => `$${key}`
	);
	console.log(
		"🚀 ~ file: filter.js ~ line 7 ~ filter ~ conditions",
		conditions
	);
	return JSON.parse(conditions);
};
module.exports = { filter };
