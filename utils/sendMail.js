const nodeMailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");
// const ejs = require("ejs");
const path = require("path");
// const handlebarOptions = {
// 	viewEngine: {
// 		extName: ".handlebars",
// 		partialsDir: path.join(__dirname, "..", "templates", "partials"),
// 		defaultLayout: false,
// 	},
// 	viewPath: path.join(__dirname, "..", "templates"),
// 	extName: ".handlebars",
// };
const sendMail = async (options) => {
	const transporter = nodeMailer.createTransport({
		host: "smtp.google.com",
		port: 465,
		secure: false,
		requireTLS: true,
		service: process.env.SERVICE,
		auth: {
			user: process.env.MAIL,
			pass: process.env.PASSWORD,
		},
	});
	// transporter.use("compile", hbs(handlebarOptions));
	// const html = ejs.renderFile(options.html);
	const mailOptions = {
		from: process.env.MAIL,
		to: options.email,
		subject: options.subject,
		html: options.template,
		// text: options.message,
		// template: options.template,
		// context: { arr: ["d", "e"] },
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendMail };
