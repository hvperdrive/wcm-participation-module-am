"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.14.factories", []);
	angular.module("wcm-participation_0.0.14.services", ["wcm-participation_0.0.14.factories"]);
	angular.module("wcm-participation_0.0.14.controllers", ["wcm-participation_0.0.14.services"]);
	angular.module("wcm-participation_0.0.14.directives", ["wcm-participation_0.0.14.controllers"]);

	angular.module("wcm-participation_0.0.14", [

		"pelorus.services",

		"wcm-participation_0.0.14.factories",
		"wcm-participation_0.0.14.services",
		"wcm-participation_0.0.14.controllers",
		"wcm-participation_0.0.14.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

