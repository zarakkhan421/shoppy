const nodeMailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const path = require("path");
const handlebarOptions = {
	viewEngine: {
		extName: ".handlebars",
		partialsDir: path.join(__dirname, "..", "templates"),
		defaultLayout: false,
	},
	viewPath: path.join(__dirname, "..", "templates"),
	extName: ".handlebars",
};
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
	transporter.use("compile", hbs(handlebarOptions));
	const mailOptions = {
		from: process.env.MAIL,
		to: options.email,
		subject: options.subject,
		// text: options.message,
		template: "email",
		context: {
			title: "my title",
			text: "text",
		},
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendMail };
