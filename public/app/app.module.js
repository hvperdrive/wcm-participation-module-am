"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.12.factories", []);
	angular.module("wcm-participation_0.0.12.services", ["wcm-participation_0.0.12.factories"]);
	angular.module("wcm-participation_0.0.12.controllers", ["wcm-participation_0.0.12.services"]);
	angular.module("wcm-participation_0.0.12.directives", ["wcm-participation_0.0.12.controllers"]);

	angular.module("wcm-participation_0.0.12", [

		"pelorus.services",

		"wcm-participation_0.0.12.factories",
		"wcm-participation_0.0.12.services",
		"wcm-participation_0.0.12.controllers",
		"wcm-participation_0.0.12.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

