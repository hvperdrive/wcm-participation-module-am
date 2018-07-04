"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.26.factories", []);
	angular.module("wcm-participation_0.0.26.services", ["wcm-participation_0.0.26.factories"]);
	angular.module("wcm-participation_0.0.26.controllers", ["wcm-participation_0.0.26.services"]);
	angular.module("wcm-participation_0.0.26.directives", ["wcm-participation_0.0.26.controllers"]);

	angular.module("wcm-participation_0.0.26", [

		"pelorus.services",

		"wcm-participation_0.0.26.factories",
		"wcm-participation_0.0.26.services",
		"wcm-participation_0.0.26.controllers",
		"wcm-participation_0.0.26.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

