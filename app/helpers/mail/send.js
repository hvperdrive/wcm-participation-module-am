const MailHelper = require("wcm-mail-helper");
const getVariables = require("../variables").get;

module.exports = ({ to, subject, template, data, icalEvent, medium }) => {
	const variables = getVariables();
	let from = {
		name: variables.email.variables.fromName || "Antwerpen Morgen",
		address: variables.email.variables.address || "antwerpenmorgen@antwerpen.be",
	};

	if (medium === "dgv-website") {
		from = {
			name: variables.email.variables.dgvFromName || "De Grote Verbinding",
			address: variables.email.variables.dgvAddress || "dgv@antwerpen.be",
		}
	}

	const options = {
		template,
		data,
		emailOptions: {
			from,
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
