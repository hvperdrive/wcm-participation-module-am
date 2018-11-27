const MailHelper = require("wcm-mail-helper");
const getVariables = require("../variables").get;

module.exports = ({ to, subject, template, data, icalEvent }) => {
	const variables = getVariables();

	const options = {
		template,
		data,
		emailOptions: {
			from: {
				name: variables.email.variables.fromName || "Antwerpen Morgen",
				address: variables.email.variables.address || "antwerpenmorgen@antwerpen.be",
			},
			to,
			subject,
			icalEvent,
		},
		senderConfig: {
			host: variables.email.variables.host,
			port: variables.email.variables.port,
			auth: {
				user: variables.email.variables.user,
				pass: variables.email.variables.pass,
			},
		},
	};

	return MailHelper.compileAndSend(options);
};
