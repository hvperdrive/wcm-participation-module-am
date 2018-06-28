const R = require("ramda");
const Q = require("q");
const path = require("path");
const fs = require("fs");
const MailHelper = require("wcm-mail-helper");

const translator = require(path.join(process.cwd(), "/app/helpers/translator"));
const queries = require("../queries");
const variables = require("../variables");
const baseTemplate = fs.readFileSync(path.join(__dirname, "./templates/baseLayout.html")).toString();

const TYPE_REMIND = "TYPE_REMIND"; // Reminder e-mail for event
const TYPE_CONFIRM = "TYPE_CONFIRM"; // Confirm e-mail for user that has subscribed
const TYPE_MAP = {
	[TYPE_REMIND]: {
		subject: "emailReminderSubject",
		template: "templateReminderEmail",
	},
	[TYPE_CONFIRM]: {
		subject: "emailConfirmSubject",
		template: "templateConfirmEmail",
	},
};

// GETTERS
const getParticipationId = R.pathOr(false, ["data", "participation"]);
const getApplicationEmail = R.pathOr(false, ["data", "email"]);
const getParticipationTemplate = (item, type) => {
	const fieldId = R.pathOr(TYPE_MAP[TYPE_CONFIRM].template, [type, "template"])(TYPE_MAP);

	return R.pathOr(false, ["fields", fieldId, "nl"])(item);
};
const getParticipationSubject = (item, type) => {
	const fieldId = R.pathOr(TYPE_MAP[TYPE_CONFIRM].subject, [type, "subject"])(TYPE_MAP);

	return R.pathOr(false, ["fields", fieldId, "nl"])(item);
};
const getParticipationFields = R.compose(
	R.omit([
		"templateConfirmEmail",
		"templateReminderEmail",
		"emailConfirmSubject",
		"emailReminderSubject",
		"reminderMailDateTime",
		"timelineLabel",
		"documents",
	]),
	R.pathOr({}, ["fields"])
);

const mapToMailData = (applicationEmail, participation, type, additionalData) => {
	const subject = getParticipationSubject(participation, type);
	const template = getParticipationTemplate(participation, type);

	// No template or subject set => skip
	if (!template || !subject) {
		return Q.when(null);
	}

	const data = R.compose(
		R.merge(R.__, additionalData ||  {}),
		R.curry(translator)(R.__, "nl"),
		getParticipationFields
	)(participation);

	return Q.all([
		MailHelper.generateHtmlFromTemplate({ template: subject, data }),
		MailHelper.generateHtmlFromTemplate({ template, data }),
	]).then((result) => ({
		to: applicationEmail,
		subject: result[0],
		template: baseTemplate,
		data: Object.assign(data, { body: result[1] }),
	}));
};

const createFinalRemindMailData = (participation) => {
	const to = R.path(["email", "variables", "confirmEmails"], variables.get());

	if (!participation || !to) {
		return Q.when(null);
	}

	return mapToMailData(
		to,
		participation,
		TYPE_REMIND,
		{ preMessage: "De volgend reminder e-mail werd succesvol verstuurd naar de ingeschreven personen" }
	).then((mailData) => Object.assign({}, mailData, {
		subject: "Reminder e-mail succesvol verzonden: " + mailData.subject,
	}));
};

module.exports.confirm = (application) => {
	const participationId = getParticipationId(application);
	const applicationEmail = getApplicationEmail(application);

	if (!participationId) {
		throw { status: 500, msg: "Invalid application before sending confirm mail" };
	}

	// No email set => skip
	if (!applicationEmail) {
		return Q.when(null);
	}

	return queries.getParticipationInfo(participationId)
		.then((participation) => mapToMailData(applicationEmail, participation, TYPE_CONFIRM));
};

module.exports.remind = (application, participation) => {
	const applicationEmail = getApplicationEmail(application);

	if (!participation) {
		throw { status: 500, msg: "Invalid application before sending remind mail" };
	}

	// No email set => skip
	if (!applicationEmail) {
		return Q.when(null);
	}

	return mapToMailData(applicationEmail, participation, TYPE_REMIND);
};

module.exports.remindConfirm = (participation) => {
	if (!participation) {
		throw { status: 500, msg: "Invalid application before sending remind confirm mail" };
	}

	return createFinalRemindMailData(participation);
};
