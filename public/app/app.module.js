"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.28.factories", []);
	angular.module("wcm-participation_0.0.28.services", ["wcm-participation_0.0.28.factories"]);
	angular.module("wcm-participation_0.0.28.controllers", ["wcm-participation_0.0.28.services"]);
	angular.module("wcm-participation_0.0.28.directives", ["wcm-participation_0.0.28.controllers"]);

	angular.module("wcm-participation_0.0.28", [

		"pelorus.services",

		"wcm-participation_0.0.28.factories",
		"wcm-participation_0.0.28.services",
		"wcm-participation_0.0.28.controllers",
		"wcm-participation_0.0.28.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

