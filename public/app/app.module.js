"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.24.factories", []);
	angular.module("wcm-participation_0.0.24.services", ["wcm-participation_0.0.24.factories"]);
	angular.module("wcm-participation_0.0.24.controllers", ["wcm-participation_0.0.24.services"]);
	angular.module("wcm-participation_0.0.24.directives", ["wcm-participation_0.0.24.controllers"]);

	angular.module("wcm-participation_0.0.24", [

		"pelorus.services",

		"wcm-participation_0.0.24.factories",
		"wcm-participation_0.0.24.services",
		"wcm-participation_0.0.24.controllers",
		"wcm-participation_0.0.24.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

