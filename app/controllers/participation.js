"use strict";

const R = require("ramda");
const Q = require("q");

const ParticipationApplication = require("../models/participationApplication");

const validators = require("../helpers/validators");
const mappers = require("../helpers/mappers");
const queries = require("../helpers/queries");

const sendErrorResult = (res, error) => {
	// Handle custom error
	if (R.pathOr(false, ["status"])(error)) {
		return res.status(error.status).json(error);
	}

	// Handle default error
	return res.status(500).json(error);
};

module.exports.apply = (req, res) => {
	if (!validators.participationApply(req.body)) {
		return res.status(400).json({ err: "invalid body" });
	}

	// Check if participation uuid is valid and get _id
	return queries.getParticipationId(req.body.participationUuid)
		// Map the body to a valid participationApplication model
		.then((participationId) => mappers.participationApply(req.body, participationId))
		.then((application) => validators.userIsRegistered(application))
		.then((result) => result.isRegistered ? Q.reject({ status: 409, message: "User already defined" }) : result.data)
		.then((application) => ParticipationApplication.create(application))
		.then(() => res.status(200).json({ message: "Success" }))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.getByParticipation = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.getParticipationId(req.params.uuid)
		.then((participationId) => queries.getApplicationsByParticipationId(participationId))
		.then((result) => res.status(200).json(result))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.getAllParticipations = (req, res) => {
	return queries.getAllParticipations()
		.then((result) => res.status(200).json(result))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.check = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.toggleCheck(req.params.uuid, true)
		.then(() => res.status(200).json({ message: "Success" }))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.uncheck = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.toggleCheck(req.params.uuid, false)
		.then(() => res.status(200).json({ message: "Success" }))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.remove = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.removeApplication(req.params.uuid)
		.then(() => res.status(200).json({ message: "Success" }))
		.catch((error) => sendErrorResult(res, error));
};
