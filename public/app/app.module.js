"use strict";

(function(angular) {
	angular.module("wcm-participation_0.2.1.factories", []);
	angular.module("wcm-participation_0.2.1.services", ["wcm-participation_0.2.1.factories"]);
	angular.module("wcm-participation_0.2.1.controllers", ["wcm-participation_0.2.1.services"]);
	angular.module("wcm-participation_0.2.1.directives", ["wcm-participation_0.2.1.controllers"]);

	angular.module("wcm-participation_0.2.1", [

		"pelorus.services",

		"wcm-participation_0.2.1.factories",
		"wcm-participation_0.2.1.services",
		"wcm-participation_0.2.1.controllers",
		"wcm-participation_0.2.1.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

