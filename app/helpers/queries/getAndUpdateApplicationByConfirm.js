const R = require("ramda");

const ParticipationApplication = require("../../models/participationApplication");
const ContentModel = require("@wcm/module-helper").models.Content;

const variables = require("../variables");

// STEP 1: Get all participations that need to have a reminder mail sent
// STEP 2: Get all applications of the retreived participations that have no reminder mail sent yet.
// SETP 3: Update the retreived applications in one query to set the reminded property on true.
// STEP 4: Return all applications if there where modificitions during update otherwise return empty array (another server already coverd it)
module.exports = () => {
	const currDate = new Date();

	// STEP 1
	return ContentModel.find({
		"fields.reminderMailDateTime": { $lte: currDate.toISOString() }, // Only send reminder mails if a specific date has passed
		"fields.endDate": { $gt: currDate.toISOString }, // exclude participations that have ended
		"meta.deleted": false,
		"meta.published": true,
		"meta.contentType": variables.get().participationId,
	}, { _id: 1 })
		.lean()
		.exec()
		// STEP 2
		.then((content) => {
			const ids = content.map(c => c._id.toString());

			if (!ids.length) {
				return [];
			}

			return ParticipationApplication.find({
				"data.participation": { $in: ids },
				"meta.deleted": false,
				"meta.reminded": false,
				"data.optIns.reminder": true,
			})
				.populate("data.participation", ["_id", "fields"])
				.lean()
				.exec();
		})
		// STEP 3
		.then((applications) => {
			const ids = applications.map((a) => a._id);

			if (!ids.length) {
				return {};
			}

			return ParticipationApplication.update({
				"_id": { $in: ids },
				"meta.reminded": false,
			}, { $set: { "meta.reminded": true } })
				.then((writeResult) => ({ writeResult, applications }));
		})
		// STEP 4
		.then((result) => {
			if (!R.pathOr(false, ["writeResult", "nModified"])(result)) {
				return [];
			}

			return result.applications || [];
		});
};

