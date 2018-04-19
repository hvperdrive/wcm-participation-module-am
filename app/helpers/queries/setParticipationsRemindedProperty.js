"use strict";

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (ids) => ParticipationApplication.update({
	_id: { $in: Array.isArray(ids) ? ids : [ids] },
}, {
	$set: { "meta.reminded": true },
}).exec();

