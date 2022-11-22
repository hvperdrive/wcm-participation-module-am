"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.2.factories", []);
	angular.module("wcm-participation_1.1.2.services", ["wcm-participation_1.1.2.factories"]);
	angular.module("wcm-participation_1.1.2.controllers", ["wcm-participation_1.1.2.services"]);
	angular.module("wcm-participation_1.1.2.directives", ["wcm-participation_1.1.2.controllers"]);

	angular.module("wcm-participation_1.1.2", [

		"pelorus.services",

		"wcm-participation_1.1.2.factories",
		"wcm-participation_1.1.2.services",
		"wcm-participation_1.1.2.controllers",
		"wcm-participation_1.1.2.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

