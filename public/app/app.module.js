"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.10.factories", []);
	angular.module("wcm-participation_0.0.10.services", ["wcm-participation_0.0.10.factories"]);
	angular.module("wcm-participation_0.0.10.controllers", ["wcm-participation_0.0.10.services"]);
	angular.module("wcm-participation_0.0.10.directives", ["wcm-participation_0.0.10.controllers"]);

	angular.module("wcm-participation_0.0.10", [

		"pelorus.services",

		"wcm-participation_0.0.10.factories",
		"wcm-participation_0.0.10.services",
		"wcm-participation_0.0.10.controllers",
		"wcm-participation_0.0.10.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

