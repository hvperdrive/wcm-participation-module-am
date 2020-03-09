"use strict";

(function(angular) {
	angular.module("wcm-participation_0.3.3.factories", []);
	angular.module("wcm-participation_0.3.3.services", ["wcm-participation_0.3.3.factories"]);
	angular.module("wcm-participation_0.3.3.controllers", ["wcm-participation_0.3.3.services"]);
	angular.module("wcm-participation_0.3.3.directives", ["wcm-participation_0.3.3.controllers"]);

	angular.module("wcm-participation_0.3.3", [

		"pelorus.services",

		"wcm-participation_0.3.3.factories",
		"wcm-participation_0.3.3.services",
		"wcm-participation_0.3.3.controllers",
		"wcm-participation_0.3.3.directives",

	])
		.run([function() {
			console.log("Participation module is loaded and available!"); // eslint-disable-line no-console
		}]);
})(window.angular);

