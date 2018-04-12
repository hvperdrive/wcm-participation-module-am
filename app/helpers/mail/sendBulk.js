const R = require("ramda");
const Q = require("q");

const nodemailer = require("nodemailer");
const MailHelper = require("wcm-mail-helper");

const variables = require("../variables");

const messageQueue = [];
let transporter = null;

const createMessage = (mailData) => {
	const mailOptions = {
		from: {
			name: variables.get().email.variables.fromName || "Antwerpen Morgen",
			address: variables.get().email.variables.address || "antwerpenmorgen@antwerpen.be",
		},
		to: mailData.to,
		subject: mailData.subject,
	};

	return MailHelper.generateHtmlFromTemplate({ template: mailData.template, data: mailData.data })
		.then((renderedTemplate) => {
			mailOptions.html = renderedTemplate;

			return mailOptions;
		});
};

const sendMail = () => {
	if (!transporter) {
		initPool(variables.get());
	}

	while (transporter.isIdle() && messageQueue.length) {
		transporter.sendMail(messageQueue.shift(), (err) => {
			if (err) {
				console.log("MAIL SENT ERROR", err); // eslint-disable-line no-console
			}
			if (!messageQueue.length) {
				transporter.close();
				transporter = null;
			}
		});
	}


};

module.exports = (arrMailData) => {
	if (!arrMailData.length) {
		return;
	}

	if (!transporter) {
		initPool(variables.get());
	}

	const messagesPromise = R.compose(
		Q.all,
		R.map((mailData) => createMessage(mailData))
	)(arrMailData);

	return messagesPromise.then((messages) => messageQueue.push(...messages))
		.then(() => sendMail())
		.catch((err) => console.log(err)); // eslint-disable-line no-console
};

const initPool = module.exports.initPool = module.exports.resetPool = () => {
	if (transporter) {
		transporter.close();
		transporter = null;
	}

	transporter = nodemailer.createTransport({
		host: variables.get().email.variables.host,
		port: variables.get().email.variables.port,
		auth: {
			user: variables.get().email.variables.user,
			pass: variables.get().email.variables.pass,
		},
		pool: true,
		maxConnections: 20,
		rateDelta: 500,
		rateLimit: 1,
	});

	transporter.on("idle", () => sendMail());
};
