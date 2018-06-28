"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.23.factories", []);
	angular.module("wcm-participation_0.0.23.services", ["wcm-participation_0.0.23.factories"]);
	angular.module("wcm-participation_0.0.23.controllers", ["wcm-participation_0.0.23.services"]);
	angular.module("wcm-participation_0.0.23.directives", ["wcm-participation_0.0.23.controllers"]);

	angular.module("wcm-participation_0.0.23", [

		"pelorus.services",

		"wcm-participation_0.0.23.factories",
		"wcm-participation_0.0.23.services",
		"wcm-participation_0.0.23.controllers",
		"wcm-participation_0.0.23.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

