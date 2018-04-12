"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.7.factories", []);
	angular.module("wcm-participation_0.0.7.services", ["wcm-participation_0.0.7.factories"]);
	angular.module("wcm-participation_0.0.7.controllers", ["wcm-participation_0.0.7.services"]);
	angular.module("wcm-participation_0.0.7.directives", ["wcm-participation_0.0.7.controllers"]);

	angular.module("wcm-participation_0.0.7", [

		"pelorus.services",

		"wcm-participation_0.0.7.factories",
		"wcm-participation_0.0.7.services",
		"wcm-participation_0.0.7.controllers",
		"wcm-participation_0.0.7.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

