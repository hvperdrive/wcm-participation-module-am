"use strict";

const getAllParticipations = require("./getAllParticipations");
const getAndUpdateApplicationByConfirm = require("./getAndUpdateApplicationByConfirm");
const getApplicationByEmailOrPhone = require("./getApplicationByEmailOrPhone");
const getApplicationsByParticipationId = require("./getApplicationsByParticipationId");
const getParticipationId = require("./getParticipationId");
const getParticipationInfo = require("./getParticipationInfo");
const removeApplication = require("./removeApplication");
const setParticipationsRemindedProperty = require("./setParticipationsRemindedProperty");
const toggleApplicationChecked = require("./toggleApplicationChecked");

module.exports = {
	getAllParticipations,
	getAndUpdateApplicationByConfirm,
	getApplicationByEmailOrPhone,
	getApplicationsByParticipationId,
	getParticipationId,
	getParticipationInfo,
	removeApplication,
	setParticipationsRemindedProperty,
	toggleApplicationChecked,
};
