const R = require("ramda");
const Q = require("q");

const mail = require("../mail");
const queries = require("../queries");

module.exports = () => {
	return queries.getAndUpdateApplicationByRemind()
		.then((applications) => {
			const promises = applications.map((a) => mail.prepare.remind(a, a.data.participation));

			R.when(
				(arr) => !!arr.length,
				R.compose(
					(p) => promises.push(p),
					mail.prepare.remindConfirm,
					R.pathOr(false, [0, "data", "participation"])
				)
			)(applications); // Add remind confirm email to the queue

			return Q.all(promises);
		})
		.then((arrMailData) => R.compose(
			mail.sendBulk,
			R.filter((item) => !!item) // filter out null values
		)(arrMailData));
};
