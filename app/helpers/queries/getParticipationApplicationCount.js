const R = require("ramda");
const path = require("path");

const variables = require("../variables");
const ParticipationApplicationModel = require("../../models/participationApplication");
const ContentModel = require(path.join(process.cwd(), "app/models/content"));
const ContentHelper = require(path.join(process.cwd(), "app/controllers/contents/helpers"));

module.exports = (slug) => {
	return ContentHelper.getSlugQuery(slug)
		.then((slugQuery) => Object.assign({
			"meta.contentType": variables.get().participationId,
			"meta.deleted": false,
			"meta.published": true,
		}, slugQuery))
		.then((query) => ContentModel.findOne(query, { _id: 1 }).lean().exec())
		.then((participation) => {
			if (!participation) {
				throw { status: 404, message: "participation item not found" };
			}

			return ParticipationApplicationModel.aggregate([
				{ $match: { "data.participation": participation._id.toString(), "meta.deleted": false } },
				{ $group: { _id: null, count: { $sum: { $ifNull: ["$data.amount", 1] } } } },
			]).exec().then((result) => console.log(result) || R.pathOr(0, [0, "count"])(result));
		});
};
