"use strict";

const variablesHelper = require("../helpers/variables");
const mail = require("../helpers/mail");
const cron = require("../helpers/cron");

const onLoadComplete = () => {
	variablesHelper.reload();
};
const onConfigurationChanged = () => {
	variablesHelper.reload().then((variables) => {
		mail.sendBulk.resetPool(variables);
		cron.reset();
	});
};

module.exports.handleHooks = (hooks) => {
	const myHooks = {
		onLoadComplete: onLoadComplete,
		onConfigurationChanged: onConfigurationChanged,
	};

	Object.assign(hooks, myHooks);
};
