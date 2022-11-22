"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.3.factories", []);
	angular.module("wcm-participation_1.1.3.services", ["wcm-participation_1.1.3.factories"]);
	angular.module("wcm-participation_1.1.3.controllers", ["wcm-participation_1.1.3.services"]);
	angular.module("wcm-participation_1.1.3.directives", ["wcm-participation_1.1.3.controllers"]);

	angular.module("wcm-participation_1.1.3", [

		"pelorus.services",

		"wcm-participation_1.1.3.factories",
		"wcm-participation_1.1.3.services",
		"wcm-participation_1.1.3.controllers",
		"wcm-participation_1.1.3.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

