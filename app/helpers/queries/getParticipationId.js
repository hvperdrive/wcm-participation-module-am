"use strict";

const path = require("path");
const R = require("ramda");

const ContentModel = require(path.join(process.cwd(), "/models/content"));

const variables = require("../helpers/variables");

module.exports = (uuid) => ContentModel.findOne({
	uuid: uuid,
	"meta.deleted": false,
	"meta.published": true,
}, { "meta.contentType": 1, "_id": 1 })
	.lean()
	.exec()
	.then((participationItem) => {
		// Check if the content is of type participation
		if (!participationItem || R.pathOr(null, ["meta.contentType"])(participationItem) !== variables.get().participationId) {
			throw {
				status: 400,
				msg: "Invalid participation uuid",
			};
		}

		// Map the body to a valid participationApplication model
		return participationItem._id;
	});
