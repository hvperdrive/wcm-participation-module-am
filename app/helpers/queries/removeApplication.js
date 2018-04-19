"use strict";

const ParticipationApplication = require("../../models/participationApplication");

module.exports = (uuid) => ParticipationApplication.update({ uuid }, { $set: { "meta.deleted": true } }).exec();
