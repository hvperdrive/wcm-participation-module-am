const R = require("ramda");
const Q = require("q");

const mail = require("../mail");
const queries = require("../queries");

module.exports = () => {
	return queries.getExpiredParticipations()
		.then((participations) => {
            return queries.removeApplicationsByParticipationIds(participations.map(({ _id }) => _id))
		});
};
