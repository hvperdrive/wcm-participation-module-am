"use strict";

const ParticipationApplication = require("../models/participationApplication");

module.exports = (email, phone) => ParticipationApplication.find({
	"$or": [
		{ "data.email": email },
		{
			"$and": [
				{ "data.phone.number": phone.number },
				{ "data.phone.selectedCountry.dialCode": phone.selectedCountry.dialCode },
			],
		},
	],
	"meta.deleted": false,
});

