"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.1.controllers")
		.controller("participationsDetailController", [
			"$scope",
			"$controller",

			// Services
			"LabelService",

			// Factories
			"participationsFactory",

			// Resolves
			"InstanceData",
			"ListData",

			function($scope, $controller, LabelService, participationsFactory, InstanceData, ListData) {

				// Referencing the required factory
				$scope._factory = participationsFactory;

				// Extend the default resource controller
				angular.extend(this, $controller("ResourceController", { $scope: $scope, InstanceData: InstanceData, Languages: [] }));

				// ResourceView configuration
				$scope.context.type = LabelService.getString("Participations"); // Set the current type to "Member"

				// $scope events
				$scope.$on("$destroy", function() {
					$scope._newInstance = undefined;
					$scope._instance = undefined;
				});
			},
		]);
})(window.angular);
