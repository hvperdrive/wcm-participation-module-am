const MailHelper = require("wcm-mail-helper");
const variables = require("../variables");

module.exports = (to, subject, template, data) => {
	const options = {
		template,
		data,
		emailOptions: {
			from: {
				name: variables.email.variables.fromName,
				address: variables.email.variables.address,
			},
			to,
			subject,
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
