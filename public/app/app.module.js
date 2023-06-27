"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.8.factories", []);
	angular.module("wcm-participation_1.1.8.services", ["wcm-participation_1.1.8.factories"]);
	angular.module("wcm-participation_1.1.8.controllers", ["wcm-participation_1.1.8.services"]);
	angular.module("wcm-participation_1.1.8.directives", ["wcm-participation_1.1.8.controllers"]);

	angular.module("wcm-participation_1.1.8", [

		"pelorus.services",

		"wcm-participation_1.1.8.factories",
		"wcm-participation_1.1.8.services",
		"wcm-participation_1.1.8.controllers",
		"wcm-participation_1.1.8.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

