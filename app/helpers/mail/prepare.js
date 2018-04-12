const R = require("ramda");
const Q = require("q");
const path = require("path");
const MailHelper = require("wcm-mail-helper");

const translator = require(path.join(process.cwd(), "/app/helpers/translator"));


const queries = require("../queries");

const TYPE_REMIND = "TYPE_REMIND";
const TYPE_CONFIRM = "TYPE_CONFIRM";

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
const getParticipationConfirmTemplate = (item, type) => {
	const fieldId = R.pathOr(TYPE_MAP[TYPE_CONFIRM].template, [type, "template"])(TYPE_MAP);

	return R.pathOr(false, ["fields", fieldId, "nl"])(item);
};
const getParticipationConfirmSubject = (item, type) => {
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

const mapToMailData = (applicationEmail, participation, type) => {
	const subject = getParticipationConfirmSubject(participation, type);
	const template = getParticipationConfirmTemplate(participation, type);

	// No template or subject set => skip
	if (!template || !subject) {
		return null;
	}

	const data = R.compose(
		R.curry(translator)(R.__, "nl"),
		getParticipationFields
	)(participation);


	return Q.all([
		MailHelper.generateHtmlFromTemplate({ template: subject, data }),
		MailHelper.generateHtmlFromTemplate({ template, data }),
	]).then((result) => ({
		to: applicationEmail,
		subject: result[0],
		template: "body here: <br/> {{body | safe}}",
		data: Object.assign(data, { body: result[1] }),
	}));
};


module.exports.confirm = (application) => {
	const participationId = getParticipationId(application);
	const applicationEmail = getApplicationEmail(application);

	if (!participationId) {
		throw { status: 500, msg: "Invalid application before sending mail" };
	}

	// No email set => skip
	if (!applicationEmail) {
		return null;
	}

	return queries.getParticipationInfo(participationId)
		.then((participation) => mapToMailData(applicationEmail, participation, TYPE_CONFIRM));
};

module.exports.remind = (application, participation) => {
	const applicationEmail = getApplicationEmail(application);

	if (!participation) {
		throw { status: 500, msg: "Invalid application before sending mail" };
	}

	// No email set => skip
	if (!applicationEmail) {
		return null;
	}

	return mapToMailData(applicationEmail, participation, TYPE_REMIND);
};
