"use strict";

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (uuid, bool) => ParticipationApplication.update({ uuid }, { $set: { "meta.checked": bool } }).exec();
