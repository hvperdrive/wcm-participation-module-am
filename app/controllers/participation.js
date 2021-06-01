const R = require("ramda");
const Q = require("q");

const ParticipationApplication = require("../models/participationApplication");

const validators = require("../helpers/validators");
const mappers = require("../helpers/mappers");
const queries = require("../helpers/queries");
const mailHelper = require("../helpers/mail");

const sendErrorResult = (res, error) => {
	// Handle custom error
	if (R.pathOr(false, ["status"])(error)) {
		return res.status(error.status).json(error);
	}

	// Handle default error
	return res.status(500).json(error);
};

module.exports.apply = (req, res) => {
	console.log(req.body)
	if (!validators.participationApply(req.body)) {
		return res.status(400).json({ err: "invalid body" });
	}

	// Check if participation uuid is valid and get _id
	return queries.getParticipationId(req.body.participationUuid)
		// Map the body to a valid participationApplication model
		.then((participationId) => mappers.participationApply(req.body, participationId, req.query.medium || "website"))
		.then((application) => validators.userIsRegistered(application))
		.then((result) => result.isRegistered ? Q.reject({ status: 409, message: "User already defined" }) : result.data)
		.then((application) => validators.maxApplicationsSurpassed(application).then((isInValid) => ({ isInValid, application })))
		.then((result) => result.isInValid ? Q.reject({ status: 412, mexsage: "Maximum allowed application surpassed" }) : result.application)
		.then((application) => ParticipationApplication.create(application))
		.then((application) => mailHelper.prepare.confirm(application))
		.then((mailOptions) => mailOptions ? mailHelper.send(mailOptions) : Q.when())
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

	return queries.toggleApplicationChecked(req.params.uuid, true)
		.then(() => res.status(200).json({ message: "Success" }))
		.catch((error) => sendErrorResult(res, error));
};

module.exports.uncheck = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.toggleApplicationChecked(req.params.uuid, false)
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

module.exports.export = (req, res) => {
	if (!req.params.uuid) {
		return res.status(400).json({ message: "No uuid param passed" });
	}

	return queries.getParticipationId(req.params.uuid)
		.then((participationId) => queries.getApplicationsByParticipationId(participationId))
		.then((applications) => mappers.toExcel(applications))
		.then((result) => {
			res.set("Content-Disposition", "attachment;filename=report.xlsx");
			res.set("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
			res.status(200).send(result);
		})
		.catch((error) => sendErrorResult(res, error));
};

module.exports.getParticipationApplicationCount = (req, res) => {
	if (!req.params.slug) {
		return res.status(400).json({ message: "No slug param passed" });
	}

	return queries.getParticipationApplicationCountBySlug(req.params.slug)
		.then((count) => res.status(200).json({ count }))
		.catch((error) => sendErrorResult(res, error));
};
