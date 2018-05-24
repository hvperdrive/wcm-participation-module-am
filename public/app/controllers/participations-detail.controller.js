"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.11.controllers")
		.controller("participationsDetailController", [
			"$scope",
			"$controller",
			"$window",
			"constants",
			"configuration",

			// Services
			"LabelService",

			// Factories
			"participationsFactory",

			// Resolves
			"InstanceData",
			"ListData",

			function($scope, $controller, $window, constants, configuration, LabelService, participationsFactory, InstanceData, ListData) {

				// Referencing the required factory
				$scope._factory = participationsFactory;
				$scope.data = ListData;

				$scope.checkOptions = [
					{ label: "Afgehandeld", key: "checked" },
				];

				$scope.tableConfig = {
					pagination: constants.pagination,
					searchField: {
						enabled: true,
						placeholder: LabelService.getString("Search"),
						style: {
							override: true,
							className: "c-input-text c-input-text--sm u-width-4-6 fr",
						},
					},
					columns: [{
						columnName: LabelService.getString("ID"),
						template: "<span>{{ i.data.email || i.data.phone.number }}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("Cancel opt in"),
						template: "<span>{{i.data.optIns.cancel ? 'true' : 'false'}}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("Reminder opt in"),
						template: "<span>{{i.data.optIns.reminder ? 'true' : 'false'}}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("Amount"),
						key: "data.amount",
						sortable: true,
					}, {
						columnName: LabelService.getString("Date"),
						template: "<span>{{i.meta.created | date: 'dd/MM/yyyy HH:mm'}}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("Processed"),
						template: "<input type=\"checkbox\" ng-model=\"i.meta.checked\" ng-change=\"parent.updateCheck(i.uuid, i.meta.checked)\" />",
						sortable: true,
					}, {
						columnName: LabelService.getString("Actions"),
						template: "<a >" + LabelService.getString("open") + "</a>",
					}],
				};

				// Extend the default resource controller
				angular.extend(this, $controller("ResourceController", { $scope: $scope, InstanceData: InstanceData, Languages: [] }));

				// ResourceView configuration
				$scope.context.type = LabelService.getString("Participations"); // Set the current type to "Member"

				$scope.updateCheck = function updateCheck(uuid, checked) {
					let docController = "uncheck";

					if (checked) {
						docController = "check";
					}

					participationsFactory.patch({ listController: "applications", uuid: uuid, docController: docController });
				};

				$scope.exportToExcel = function exportToExcel() {
					$window.location.href = configuration.serverPath +
						configuration.apiPrefix +
						configuration.apiLevel +
						"participations/" +
						InstanceData.uuid +
						"/applications/export";
				};

				// $scope events
				$scope.$on("$destroy", function() {
					$scope._newInstance = undefined;
					$scope._instance = undefined;
				});
			},
		]);
})(window.angular);
