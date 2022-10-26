"use strict";

const path = require("path");

const ContentModel = require(path.join(process.cwd(), "/app/models/content"));

const variables = require("../variables");

module.exports = (id) => ContentModel.findOne({
	_id: id,
	"meta.contentType": { $in: [
		variables.get().participationId,
		variables.get().activityId,
		variables.get().wedstrijdId,
	] },
}, { "versions": 0 })
	.lean()
	.exec()
	.then((participationItem) => {
		// Check if the content is of type participation
		if (!participationItem) {
			throw {
				status: 400,
				msg: "Invalid participation uuid",
			};
		}

		// Map the body to a valid participationApplication model
		return participationItem;
	});
