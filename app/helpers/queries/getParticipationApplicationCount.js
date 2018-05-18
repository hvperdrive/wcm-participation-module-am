const path = require("path");

const ParticipationApplicationModel = require("../../models/participationApplication");
const ContentModel = require(path.join(process.cwd(), "app/models/content"));

module.exports = (particpationUuid) => {
	return ContentModel.findOne({
		"uuid": particpationUuid,
		"meta.deleted": false,
		"meta.published": true,
	}, { _id: 1 })
		.lean()
		.exec()
		.then((participation) => ParticipationApplicationModel.count({
			"data.participation": participation._id,
			"meta.deleted": false,
		}));
};
