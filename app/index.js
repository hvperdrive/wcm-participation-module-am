"use strict";

const setupRoutes = require("./routes");
const variablesHelper = require("./helpers/variables");
const hooksController = require("./controllers/hooks");
const mail = require("./helpers/mail");
const cron = require("./helpers/cron");

module.exports = (app, hooks, moduleInfo) => {
	// Get variables
	variablesHelper.reload(moduleInfo)
		.then((variables) => {
			mail.sendBulk.initPool(variables);
			cron.init();
		});

	// Handle hooks
	hooksController.handleHooks(hooks);

	// Setup routes
	setupRoutes(app, moduleInfo);
};

// Exposed API (for other modules)
// module.exports.API = require("./api");
