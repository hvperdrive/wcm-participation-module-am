const R = require("ramda");
const Q = require("q");

const mail = require("../mail");
const queries = require("../queries");

module.exports = () => {
	return queries.getExpiredParticipations()
		.then((participations) => {
            console.log('PARTICIPATIONS', participations.length)
            return queries.removeApplicationsByParticipationIds(participations.map(({ _id }) => _id))
		})
		.then((applications) => {
            console.log('APPLICATIONS', applications)
        })
};
