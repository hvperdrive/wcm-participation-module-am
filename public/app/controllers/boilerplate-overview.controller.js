"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.2.controllers")
		.controller("participationsOverviewController", [

			"$scope",
			"$controller",
			"constants",

			// services
			"LabelService",

			// Resolves
			"ListData",

			function($scope, $controller, constants, LabelService, ListData) {

				$scope.data = ListData || [];

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
						key: "meta.label",
						sortable: true,
					}, {
						columnName: LabelService.getString("Begin date"),
						template: "<span>{{i.fields.beginDate | date: 'dd/MM/yyyy HH:mm'}}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("End date"),
						template: "<span>{{i.fields.endDate | date: 'dd/MM/yyyy HH:mm'}}</span>",
						sortable: true,
					}, {
						columnName: LabelService.getString("Actions"),
						template: '<a ui-sref="^.edit({uuid:i.uuid})">' + LabelService.getString("open") + "</a>",
					}],
				};
			},
		]);
})(window.angular);
