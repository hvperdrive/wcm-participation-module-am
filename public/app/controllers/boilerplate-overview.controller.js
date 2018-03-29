"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.1.controllers")
		.controller("participationsOverviewController", [

			"$scope",
			"$controller",
			"constants",

			// services
			"LabelService",

			// Resolves
			"ListData",

			function($scope, $controller, constants, LabelService, ListData) {

				$scope.data = ListData.data || [];

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
						columnName: LabelService.getString("Name"),
						key: "name",
						sortable: true,
					}, {
						columnName: LabelService.getString("Actions"),
						template: '<a ui-sref="^.edit({uuid:i.uuid})">' + LabelService.getString("Edit") + "</a>",
					}],
				};
			},
		]);
})(window.angular);
