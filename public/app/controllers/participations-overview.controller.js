"use strict";

(function(angular) {
	angular.module("wcm-participation_1.1.5.controllers")
		.controller("participationsOverviewController", [

			"$scope",
			"constants",

			// services
			"LabelService",

			// Resolves
			"ListData",

			function($scope, constants, LabelService, ListData) {

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
						key: "participation.meta.label",
						sortable: true,
					}, {
						columnName: LabelService.getString("Begin date"),
						template: "<span>{{i.participation.fields.beginDate | date: 'dd/MM/yyyy HH:mm'}}</span>",
						sortable: true,
						defaultSort: "+",
					}, {
						columnName: LabelService.getString("End date"),
						template: "<span>{{i.participation.fields.endDate | date: 'dd/MM/yyyy HH:mm'}}</span>",
						sortable: true,
						defaultSort: false,
					}, {
						columnName: LabelService.getString("Applicants"),
						key: "count",
						sortable: true,
					}, {
						columnName: LabelService.getString("Actions"),
						template: '<a ui-sref="^.edit({uuid:i.participation.uuid})">' + LabelService.getString("open") + "</a>",
					}],
				};
			},
		]);
})(window.angular);
