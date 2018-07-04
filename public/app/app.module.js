"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.27.factories", []);
	angular.module("wcm-participation_0.0.27.services", ["wcm-participation_0.0.27.factories"]);
	angular.module("wcm-participation_0.0.27.controllers", ["wcm-participation_0.0.27.services"]);
	angular.module("wcm-participation_0.0.27.directives", ["wcm-participation_0.0.27.controllers"]);

	angular.module("wcm-participation_0.0.27", [

		"pelorus.services",

		"wcm-participation_0.0.27.factories",
		"wcm-participation_0.0.27.services",
		"wcm-participation_0.0.27.controllers",
		"wcm-participation_0.0.27.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

