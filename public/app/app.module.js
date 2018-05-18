"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.9.factories", []);
	angular.module("wcm-participation_0.0.9.services", ["wcm-participation_0.0.9.factories"]);
	angular.module("wcm-participation_0.0.9.controllers", ["wcm-participation_0.0.9.services"]);
	angular.module("wcm-participation_0.0.9.directives", ["wcm-participation_0.0.9.controllers"]);

	angular.module("wcm-participation_0.0.9", [

		"pelorus.services",

		"wcm-participation_0.0.9.factories",
		"wcm-participation_0.0.9.services",
		"wcm-participation_0.0.9.controllers",
		"wcm-participation_0.0.9.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

