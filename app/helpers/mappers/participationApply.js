const R = require("ramda");

module.exports = (body, participationId, medium) => {
	const pathOrFromBody = (fallback, path) => R.pathOr(fallback, path, body);

	return {
		data: {
			participation: participationId,
			email: pathOrFromBody("", ["email"]),
			phone: pathOrFromBody("", ["tel"]),
			amount: pathOrFromBody(1, ["amount"]),
			name: pathOrFromBody("", ["name"]),
			optIns: {
				reminder: pathOrFromBody(false, ["reminderOptIn"]),
				cancel: pathOrFromBody(false, ["cancelOptIn"]),
			},
		},
		meta: {
			medium
		},
	};
};
