"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.11.factories", []);
	angular.module("wcm-participation_0.0.11.services", ["wcm-participation_0.0.11.factories"]);
	angular.module("wcm-participation_0.0.11.controllers", ["wcm-participation_0.0.11.services"]);
	angular.module("wcm-participation_0.0.11.directives", ["wcm-participation_0.0.11.controllers"]);

	angular.module("wcm-participation_0.0.11", [

		"pelorus.services",

		"wcm-participation_0.0.11.factories",
		"wcm-participation_0.0.11.services",
		"wcm-participation_0.0.11.controllers",
		"wcm-participation_0.0.11.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

