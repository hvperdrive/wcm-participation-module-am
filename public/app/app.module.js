"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.19.factories", []);
	angular.module("wcm-participation_0.0.19.services", ["wcm-participation_0.0.19.factories"]);
	angular.module("wcm-participation_0.0.19.controllers", ["wcm-participation_0.0.19.services"]);
	angular.module("wcm-participation_0.0.19.directives", ["wcm-participation_0.0.19.controllers"]);

	angular.module("wcm-participation_0.0.19", [

		"pelorus.services",

		"wcm-participation_0.0.19.factories",
		"wcm-participation_0.0.19.services",
		"wcm-participation_0.0.19.controllers",
		"wcm-participation_0.0.19.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

