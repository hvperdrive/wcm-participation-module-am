"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.4.factories", []);
	angular.module("wcm-participation_0.0.4.services", ["wcm-participation_0.0.4.factories"]);
	angular.module("wcm-participation_0.0.4.controllers", ["wcm-participation_0.0.4.services"]);
	angular.module("wcm-participation_0.0.4.directives", ["wcm-participation_0.0.4.controllers"]);

	angular.module("wcm-participation_0.0.4", [

		"pelorus.services",

		"wcm-participation_0.0.4.factories",
		"wcm-participation_0.0.4.services",
		"wcm-participation_0.0.4.controllers",
		"wcm-participation_0.0.4.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

