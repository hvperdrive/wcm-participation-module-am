const getAllParticipations = require("./getAllParticipations");
const getAndUpdateApplicationByRemind = require("./getAndUpdateApplicationByRemind");
const getApplicationByEmailOrPhone = require("./getApplicationByEmailOrPhone");
const getApplicationsByParticipationId = require("./getApplicationsByParticipationId");
const getParticipationApplicationCountById = require("./getParticipationApplicationCountById");
const getParticipationApplicationCountBySlug = require("./getParticipationApplicationCountBySlug");
const getParticipationId = require("./getParticipationId");
const getParticipationInfo = require("./getParticipationInfo");
const removeApplication = require("./removeApplication");
const setParticipationsRemindedProperty = require("./setParticipationsRemindedProperty");
const toggleApplicationChecked = require("./toggleApplicationChecked");

module.exports = {
	getAllParticipations,
	getAndUpdateApplicationByRemind,
	getApplicationByEmailOrPhone,
	getApplicationsByParticipationId,
	getParticipationApplicationCountById,
	getParticipationApplicationCountBySlug,
	getParticipationId,
	getParticipationInfo,
	removeApplication,
	setParticipationsRemindedProperty,
	toggleApplicationChecked,
};
