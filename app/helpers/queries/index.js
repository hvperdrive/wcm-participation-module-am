"use strict";

const getAllParticipations = require("./getAllParticipations");
const getApplicationByEmailOrPhone = require("./getApplicationByEmailOrPhone");
const getApplicationsByParticipationId = require("./getApplicationsByParticipationId");
const getParticipationId = require("./getParticipationId");
const getParticipationInfo = require("./getParticipationInfo");
const removeApplication = require("./removeApplication");
const toggleApplicationChecked = require("./toggleApplicationChecked");

module.exports = {
	getAllParticipations,
	getApplicationByEmailOrPhone,
	getApplicationsByParticipationId,
	getParticipationId,
	getParticipationInfo,
	removeApplication,
	toggleApplicationChecked,
};
