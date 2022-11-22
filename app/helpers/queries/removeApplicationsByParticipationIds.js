"use strict";

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (ids) => ParticipationApplication.deleteMany({
	"data.participation": { $in: ids },
}).exec();

