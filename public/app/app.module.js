"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.0.factories", []);
	angular.module("wcm-participation_1.1.0.services", ["wcm-participation_1.1.0.factories"]);
	angular.module("wcm-participation_1.1.0.controllers", ["wcm-participation_1.1.0.services"]);
	angular.module("wcm-participation_1.1.0.directives", ["wcm-participation_1.1.0.controllers"]);

	angular.module("wcm-participation_1.1.0", [

		"pelorus.services",

		"wcm-participation_1.1.0.factories",
		"wcm-participation_1.1.0.services",
		"wcm-participation_1.1.0.controllers",
		"wcm-participation_1.1.0.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

