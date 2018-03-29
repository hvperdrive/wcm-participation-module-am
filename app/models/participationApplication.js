let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let uuid = require("node-uuid");

delete mongoose.models.participationApplications;
delete mongoose.modelSchemas.participationApplications;

let ParticipationApplicationsSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	data: {
		participation: {
			type: String,
			required: true,
			ref: "content",
		},
		email: {
			type: String,
		},
		phone: {
			number: {
				type: String,
			},
			selectedCountry: {
				name: {
					type: String,
				},
				iso2: {
					type: String,
				},
				dialCode: {
					type: String,
				},
			},
		},
		optIns: {
			reminder: {
				type: Boolean,
			},
			cancel: {
				type: Boolean,
			},
		},
	},
	meta: {
		checked: {
			type: Boolean,
		},
		deleted: {
			type: Boolean,
			default: false,
		},
		created: {
			type: Date,
			required: true,
			default: Date.now,
		},
		lastModified: {
			type: Date,
			required: true,
			default: Date.now,
		},
	},
});

// Set the name of the collection
ParticipationApplicationsSchema.set("collection", "participationApplications");
module.exports = mongoose.model("participationApplications", ParticipationApplicationsSchema);
