"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.20.factories", []);
	angular.module("wcm-participation_0.0.20.services", ["wcm-participation_0.0.20.factories"]);
	angular.module("wcm-participation_0.0.20.controllers", ["wcm-participation_0.0.20.services"]);
	angular.module("wcm-participation_0.0.20.directives", ["wcm-participation_0.0.20.controllers"]);

	angular.module("wcm-participation_0.0.20", [

		"pelorus.services",

		"wcm-participation_0.0.20.factories",
		"wcm-participation_0.0.20.services",
		"wcm-participation_0.0.20.controllers",
		"wcm-participation_0.0.20.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

