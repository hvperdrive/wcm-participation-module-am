"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.7.factories", []);
	angular.module("wcm-participation_1.1.7.services", ["wcm-participation_1.1.7.factories"]);
	angular.module("wcm-participation_1.1.7.controllers", ["wcm-participation_1.1.7.services"]);
	angular.module("wcm-participation_1.1.7.directives", ["wcm-participation_1.1.7.controllers"]);

	angular.module("wcm-participation_1.1.7", [

		"pelorus.services",

		"wcm-participation_1.1.7.factories",
		"wcm-participation_1.1.7.services",
		"wcm-participation_1.1.7.controllers",
		"wcm-participation_1.1.7.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

