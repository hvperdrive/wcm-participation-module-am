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
	cell: {
		fill: {
			fgColor: {
				rgb: "FFFFFFFF",
			},
		},
	},
};

const HEADING = [
	[
		[{ value: "a1", style: STYLES.header }, { value: "b1", style: STYLES.header }, { value: "c1", style: STYLES.header }],
		["a2", "b2", "c2"],
	],
];

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
	},
	tel: {
		displayName: "Tel.",
		headerStyle: STYLES.header,
		cellStyle: STYLES.cell,
	},
};

module.exports = (applications) => R.compose(
	(dataset) => excel.buildExport([{
		name: "Report",
		heading: HEADING,
		specification: SPECIFICATION,
		data: dataset,
	}]),
	mapIndexed((app, i) => ({
		i,
		email: R.pathOr("", ["data", "email"])(app),
		tel: R.pathOr("", ["phone", "number"])(app),
	}))
)(applications);
