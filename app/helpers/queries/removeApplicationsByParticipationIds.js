"use strict";

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (ids) => ParticipationApplication.find({
	"data.participation": { $in: ids },
}).lean().exec();

