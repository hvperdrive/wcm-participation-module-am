const R = require("ramda");
const queries = require("../queries");

module.exports = (application) => queries.getParticipationInfo(application.data.participation.toString())
	.then((participation) => {
		const amount = participation.data.amount;
		const maxApplications = R.pathOr(false, ["fields.maxApplications"])(participation);

		return queries.getParticipationApplicationCountByParticipationId(participation._id.toString())
			.then((count) => ({ count, maxApplications, amount }));
	})
	.then((result) => !result.maxApplications || result.maxApplications > (result.count + result.amount));
