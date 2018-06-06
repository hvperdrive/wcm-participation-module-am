"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.18.factories", []);
	angular.module("wcm-participation_0.0.18.services", ["wcm-participation_0.0.18.factories"]);
	angular.module("wcm-participation_0.0.18.controllers", ["wcm-participation_0.0.18.services"]);
	angular.module("wcm-participation_0.0.18.directives", ["wcm-participation_0.0.18.controllers"]);

	angular.module("wcm-participation_0.0.18", [

		"pelorus.services",

		"wcm-participation_0.0.18.factories",
		"wcm-participation_0.0.18.services",
		"wcm-participation_0.0.18.controllers",
		"wcm-participation_0.0.18.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

