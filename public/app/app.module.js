"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.22.factories", []);
	angular.module("wcm-participation_0.0.22.services", ["wcm-participation_0.0.22.factories"]);
	angular.module("wcm-participation_0.0.22.controllers", ["wcm-participation_0.0.22.services"]);
	angular.module("wcm-participation_0.0.22.directives", ["wcm-participation_0.0.22.controllers"]);

	angular.module("wcm-participation_0.0.22", [

		"pelorus.services",

		"wcm-participation_0.0.22.factories",
		"wcm-participation_0.0.22.services",
		"wcm-participation_0.0.22.controllers",
		"wcm-participation_0.0.22.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

