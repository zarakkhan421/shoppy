const nodeMailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
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
	const html = await ejs.renderFile(
		path.join(__dirname, "../templates/" + options.template + ".ejs"),
		{ templateData: options.templateData }
	);
	const mailOptions = {
		from: process.env.MAIL,
		to: options.email,
		subject: options.subject,
		html,
	};
	try {
		await transporter.sendMail(mailOptions);
	} catch (error) {
		console.log(error);
	}
};

module.exports = { sendMail };
