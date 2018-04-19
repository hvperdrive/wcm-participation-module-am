const Q = require("q");

const mail = require("../mail");
const queries = require("../queries");

module.exports = () => {
	return queries.getAndUpdateApplicationByConfirm()
		.then((applications) => Q.all(applications.map((a) => mail.prepare.remind(a, a.data.participation))))
		.then((arrMailData) => mail.sendBulk(arrMailData));
};
