const R = require("ramda");

module.exports = (body) => {
	return R.allPass([
		R.pathOr(false, ["participationUuid"]),
		R.pathOr(false, ["amount"]),
		R.either(
			R.pathOr(false, ["email"]),
			R.allPass([
				R.pathOr(false, ["tel", "number"]),
				R.pathOr(false, ["tel", "selectedCountry", "name"]),
				R.pathOr(false, ["tel", "selectedCountry", "dialCode"]),
			])
		),
	])(body);
};
