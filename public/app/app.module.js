"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.5.factories", []);
	angular.module("wcm-participation_1.1.5.services", ["wcm-participation_1.1.5.factories"]);
	angular.module("wcm-participation_1.1.5.controllers", ["wcm-participation_1.1.5.services"]);
	angular.module("wcm-participation_1.1.5.directives", ["wcm-participation_1.1.5.controllers"]);

	angular.module("wcm-participation_1.1.5", [

		"pelorus.services",

		"wcm-participation_1.1.5.factories",
		"wcm-participation_1.1.5.services",
		"wcm-participation_1.1.5.controllers",
		"wcm-participation_1.1.5.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

