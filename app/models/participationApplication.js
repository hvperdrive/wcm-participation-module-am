const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uuid = require("node-uuid");

delete mongoose.models.ParticipationApplications;
delete mongoose.modelSchemas.ParticipationApplications;

const ParticipationApplicationsSchema = new Schema({
	uuid: {
		type: String,
		default: uuid,
		required: true,
	},
	data: {
		participation: {
			type: String,
			required: true,
			ref: "Content",
		},
		email: {
			type: String,
		},
		name: {
			type: String,
			required: true,
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
		amount: {
			type: Number,
			required: true,
			default: 1,
		},
	},
	meta: {
		checked: {
			type: Boolean,
			default: false,
		},
		medium: {
			type: String,
			default: "website",
		},
		reminded: {
			type: Boolean,
			default: false,
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
module.exports = mongoose.model("ParticipationApplications", ParticipationApplicationsSchema);
