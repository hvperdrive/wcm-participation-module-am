const variablesHelper = require("../helpers/variables");
const mail = require("../helpers/mail");
const cron = require("../helpers/cron");

const onLoadComplete = () => {
	variablesHelper.reload();
};
const onConfigurationChanged = () => {
	variablesHelper.reload().then(() => {
		mail.sendBulk.resetPool();
		cron.reset();
	});
};
const beforeRemove = () => {
	cron.stop();
};

module.exports.handleHooks = (hooks) => {
	const myHooks = {
		onLoadComplete,
		onConfigurationChanged,
		beforeRemove,
	};

	Object.assign(hooks, myHooks);
};
