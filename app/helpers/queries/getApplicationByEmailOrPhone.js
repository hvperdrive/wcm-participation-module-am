"use strict";

const R = require("ramda");

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (email, phone) => ParticipationApplication.find({
	"$or": [
		{ "data.email": email },
		{
			"$and": [
				{ "data.phone.number": R.pathOr(undefined, ["number"])(phone) },
				{ "data.phone.selectedCountry.dialCode": R.pathOr(undefined, ["selectedCountry", "dialCode"])(phone) },
			],
		},
	],
	"meta.deleted": false,
});

