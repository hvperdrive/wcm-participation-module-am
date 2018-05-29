"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.16.factories", []);
	angular.module("wcm-participation_0.0.16.services", ["wcm-participation_0.0.16.factories"]);
	angular.module("wcm-participation_0.0.16.controllers", ["wcm-participation_0.0.16.services"]);
	angular.module("wcm-participation_0.0.16.directives", ["wcm-participation_0.0.16.controllers"]);

	angular.module("wcm-participation_0.0.16", [

		"pelorus.services",

		"wcm-participation_0.0.16.factories",
		"wcm-participation_0.0.16.services",
		"wcm-participation_0.0.16.controllers",
		"wcm-participation_0.0.16.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

