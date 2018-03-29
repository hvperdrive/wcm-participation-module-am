"use strict";

const ParticipationApplication = require("../models/participationApplication");

module.exports = (id) => ParticipationApplication.find({
	"data.participation": id,
	"meta.deleted": false,
});

