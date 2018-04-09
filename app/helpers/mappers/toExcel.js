"use strict";

const R = require("ramda");
const excel = require("node-excel-export");

const mapIndexed = R.addIndex(R.map);

const STYLES = {
	header: {
		fill: {
			fgColor: {
				rgb: "FF000000",
			},
		},
		font: {
			color: {
				rgb: "FFFFFFFF",
			},
			sz: 14,
			bold: true,
			underline: true,
		},
	},
	cell: {},
};

const SPECIFICATION = {
	i: {
		displayName: "#",
		headerStyle: STYLES.header,
		cellStyle: STYLES.cell,
	},
	email: {
		displayName: "Email",
		headerStyle: STYLES.header,
		cellStyle: STYLES.cell,
		width: "50",
	},
	tel: {
		displayName: "Tel.",
		headerStyle: STYLES.header,
		cellStyle: STYLES.cell,
		width: "20",
	},
	created: {
		displayName: "Applied on",
		headerStyle: STYLES.header,
		cellStyle: STYLES.cell,
		width: "20",
	},
};

module.exports = (applications) => R.compose(
	(dataset) => excel.buildExport([{
		name: "Report",
		specification: SPECIFICATION,
		data: dataset,
	}]),
	mapIndexed((app, i) => ({
		i: i + 1,
		email: R.pathOr("", ["data", "email"])(app),
		tel: R.pathOr(false, ["data", "phone", "number"])(app) ?
			R.pathOr("", ["data", "phone", "selectedCountry", "dialCode"])(app) + " " + R.pathOr("", ["data", "phone", "number"])(app) :
			"",
		created: R.pathOr("", ["meta", "created"])(app),
	}))
)(applications);
