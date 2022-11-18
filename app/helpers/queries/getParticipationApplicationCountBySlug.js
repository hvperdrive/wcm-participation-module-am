const path = require("path");

const variables = require("../variables");
const ContentModel = require(path.join(process.cwd(), "app/models/content"));
const ContentHelper = require(path.join(process.cwd(), "app/controllers/contents/helpers"));

const getParticipationApplicationCountById = require("./getParticipationApplicationCountById");

module.exports = (slug) => {
	return ContentHelper.getSlugQuery(slug)
		.then((slugQuery) => Object.assign({
			"meta.contentType": { $in: [
				variables.get().participationId,
				variables.get().activityId,
				variables.get().wedstrijdId,
			] },
		}, slugQuery))
		.then((query) => ContentModel.findOne(query, { _id: 1 }).lean().exec())
		.then((participation) => {
			if (!participation) {
				throw { status: 404, message: "participation item not found" };
			}

			return getParticipationApplicationCountById(participation._id.toString());
		});
};
