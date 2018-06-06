const R = require("ramda");

const ParticipationApplicationModel = require("../../models/participationApplication");

module.exports = (participationId) => ParticipationApplicationModel.aggregate([
	{ $match: { "data.participation": participationId, "meta.deleted": false } },
	{ $group: { _id: null, count: { $sum: { $ifNull: ["$data.amount", 1] } } } },
]).exec().then((result) => R.pathOr(0, [0, "count"])(result));
