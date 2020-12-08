"use strict";

(function(angular) {
	angular.module("wcm-participation_1.0.15.factories", []);
	angular.module("wcm-participation_1.0.15.services", ["wcm-participation_1.0.15.factories"]);
	angular.module("wcm-participation_1.0.15.controllers", ["wcm-participation_1.0.15.services"]);
	angular.module("wcm-participation_1.0.15.directives", ["wcm-participation_1.0.15.controllers"]);

	angular.module("wcm-participation_1.0.15", [

		"pelorus.services",

		"wcm-participation_1.0.15.factories",
		"wcm-participation_1.0.15.services",
		"wcm-participation_1.0.15.controllers",
		"wcm-participation_1.0.15.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

