const nodeMailer = require("nodemailer");
// option is an object that has to:, sunject:,text: and text is email body
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
	const mailOpions = {
		from: process.env.MAIL,
		to: options.email,
		subject: options.subject,
		text: options.message,
	};
	await transporter.sendMail(mailOpions);
};

module.exports = { sendMail };
