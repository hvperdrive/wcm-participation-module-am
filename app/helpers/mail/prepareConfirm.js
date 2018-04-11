const R = require("ramda");

const queries = require("../queries");

// GETTERS
const getParticipationId = R.pathOr(false, ["data", "participation"]);
const getApplicationEmail = R.pathOr(false, ["data", "email"]);
const getParticipationConfirmTemplate = R.pathOr(false, ["fields", "templateConfirmEmail"]);
const getParticipationConfirmSubject = R.pathOr(false, ["fields", "emailConfirmSubject"]);
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


module.exports = (application) => {
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
		.then((participation) => {
			const subject = getParticipationConfirmSubject(participation);
			const template = getParticipationConfirmTemplate(participation);

			// No template or subject set => skip
			if (!template || !subject) {
				return null;
			}

			return {
				to: applicationEmail,
				subject,
				template,
				data: getParticipationFields(participation),
			};
		});
};
