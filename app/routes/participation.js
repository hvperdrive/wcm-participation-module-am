"use strict";

const participationController = require("../controllers/participation");

// Get the configuration of the WCM
const config = require("@wcm/module-helper").getConfig();
// This is a helper middleware function to check if the user is logged in
const ProfileSecurity = require("@wcm/module-helper").profileSecurity;
// This is a helper middleware function to specify which method is used. This will be used in the PermissionsSecurity function.
// There are four methods available: read, create, update and delete.
const MethodSecurity = require("@wcm/module-helper").methodSecurity;
// This is a helper middleware function generator that returns a middleware function that can be injected into route as seen below.
// The function will check if the user has the right permissions to execute this action.
// You need to specify the operation type that needs to be checked against (in this case it is the operation type specified in our package.json file).
const PermissionsSecurity = require("@wcm/module-helper").permissionsSecurity("participation");

// Building the baseUrl based on the configuration. Every API call needs to be located after the api/ route
const baseUrl = "/" + config.api.prefix + config.api.version + "participations";

module.exports = (app) => {

	// Admin
	app.route(baseUrl).get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, participationController.getAllParticipations);
	app.route(baseUrl + "/:uuid/applications").get(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, participationController.getByParticipation);

	app.route(baseUrl + "/applications/:uuid/check").put(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, participationController.check);
	app.route(baseUrl + "/applications/:uuid/uncheck").put(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, participationController.uncheck);

	app.route(baseUrl + "/applications/:uuid").delete(ProfileSecurity, MethodSecurity.read, PermissionsSecurity, participationController.remove);

	// Public
	app.route(baseUrl + "/applications").post(participationController.apply);

};
