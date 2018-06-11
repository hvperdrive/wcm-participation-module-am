"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.21.factories", []);
	angular.module("wcm-participation_0.0.21.services", ["wcm-participation_0.0.21.factories"]);
	angular.module("wcm-participation_0.0.21.controllers", ["wcm-participation_0.0.21.services"]);
	angular.module("wcm-participation_0.0.21.directives", ["wcm-participation_0.0.21.controllers"]);

	angular.module("wcm-participation_0.0.21", [

		"pelorus.services",

		"wcm-participation_0.0.21.factories",
		"wcm-participation_0.0.21.services",
		"wcm-participation_0.0.21.controllers",
		"wcm-participation_0.0.21.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

