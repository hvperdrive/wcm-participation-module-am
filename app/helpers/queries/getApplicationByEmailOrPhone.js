"use strict";

const Q = require("q");
const R = require("ramda");

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (participationId, email, phone) => {
	const or = [];

	if (email) {
		or.push({ "data.email": email });
	}

	if (R.pathOr(false, ["number"])(phone) && R.pathOr(false, ["selectedCountry", "dialCode"])(phone)) {
		or.push({
			"$and": [
				{ "data.phone.number": R.pathOr(false, ["number"])(phone) },
				{ "data.phone.selectedCountry.dialCode": R.pathOr(false, ["selectedCountry", "dialCode"])(phone) },
			],
		});
	}

	if (!or.length) {
		return Q.when([]);
	}

	return ParticipationApplication.find({
		"$or": or,
		"data.participation": participationId,
		"meta.deleted": false,
	}).lean().exec();
};

