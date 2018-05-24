"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.13.factories", []);
	angular.module("wcm-participation_0.0.13.services", ["wcm-participation_0.0.13.factories"]);
	angular.module("wcm-participation_0.0.13.controllers", ["wcm-participation_0.0.13.services"]);
	angular.module("wcm-participation_0.0.13.directives", ["wcm-participation_0.0.13.controllers"]);

	angular.module("wcm-participation_0.0.13", [

		"pelorus.services",

		"wcm-participation_0.0.13.factories",
		"wcm-participation_0.0.13.services",
		"wcm-participation_0.0.13.controllers",
		"wcm-participation_0.0.13.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

