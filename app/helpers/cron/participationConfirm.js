const R = require("ramda");
const Q = require("q");

const mail = require("../mail");
const queries = require("../queries");

module.exports = () => {
	return queries.getAndUpdateApplicationByRemind()
		.then((applications) => {
			const promises = applications.map((a) => mail.prepare.remind(a, a.data.participation));

			R.compose(
				promises.push,
				mail.prepare.createFinalRemindMailData,
				R.path([0, "data", "participation"])
			)(applications); // Add remind confirm email to the queue

			return Q.all(promises);
		})
		.then((arrMailData) => R.compose(
			mail.sendBulk,
			R.filter((item) => !!item) // filter out null values
		)(arrMailData));
};
