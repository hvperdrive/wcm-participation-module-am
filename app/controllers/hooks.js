"use strict";

const variablesHelper = require("../helpers/variables");

const onLoadComplete = () => {
	// Initiate passport strategies
	variablesHelper.reload();
};
const onConfigurationChanged = () => {
	// Initiate passport strategies
	variablesHelper.reload();
};

module.exports.handleHooks = (hooks) => {
	let myHooks = {
		onLoadComplete: onLoadComplete,
		onConfigurationChanged: onConfigurationChanged,
	};

	Object.assign(hooks, myHooks);
};
