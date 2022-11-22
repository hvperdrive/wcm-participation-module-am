"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.6.factories", []);
	angular.module("wcm-participation_1.1.6.services", ["wcm-participation_1.1.6.factories"]);
	angular.module("wcm-participation_1.1.6.controllers", ["wcm-participation_1.1.6.services"]);
	angular.module("wcm-participation_1.1.6.directives", ["wcm-participation_1.1.6.controllers"]);

	angular.module("wcm-participation_1.1.6", [

		"pelorus.services",

		"wcm-participation_1.1.6.factories",
		"wcm-participation_1.1.6.services",
		"wcm-participation_1.1.6.controllers",
		"wcm-participation_1.1.6.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

