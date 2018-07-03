"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.25.factories", []);
	angular.module("wcm-participation_0.0.25.services", ["wcm-participation_0.0.25.factories"]);
	angular.module("wcm-participation_0.0.25.controllers", ["wcm-participation_0.0.25.services"]);
	angular.module("wcm-participation_0.0.25.directives", ["wcm-participation_0.0.25.controllers"]);

	angular.module("wcm-participation_0.0.25", [

		"pelorus.services",

		"wcm-participation_0.0.25.factories",
		"wcm-participation_0.0.25.services",
		"wcm-participation_0.0.25.controllers",
		"wcm-participation_0.0.25.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

