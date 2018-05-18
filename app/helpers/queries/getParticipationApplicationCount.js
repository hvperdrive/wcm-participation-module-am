const path = require("path");

const ParticipationApplicationModel = require("../../models/participationApplication");
const ContentModel = require(path.join(process.cwd(), "app/models/content"));
const ContentHelper = require(path.join(process.cwd(), "controllers/content/helpers"));

module.exports = (slug) => {
	return ContentHelper.getSlugQuery(slug)
		.then((slugQuery) => Object.assign({
			"meta.deleted": false,
			"meta.published": true,
		}, slugQuery))
		.then((query) => ContentModel.findOne(query, { _id: 1 }).lean().exec())
		.then((participation) => {
			if (!participation) {
				throw { statusCode: 404, message: "participation item not found" };
			}

			return ParticipationApplicationModel.count({
				"data.participation": participation._id,
				"meta.deleted": false,
			});
		});
};
