"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.4")
		.config([

			"$stateProvider",
			"participationsConfigProvider",

			function($stateProvider, participationsConfigProvider) {

				var moduleFolder = participationsConfigProvider.API.modulePath;

				$stateProvider

					.state("pelorus.wcm-participation.index", {
						url: "",
						access: {
							requiresLogin: true,
						},
						resolve: {
							ListData: ["participationsFactory", function(participationsFactory) {
								return participationsFactory.query().$promise;
							}],
						},
						ncyBreadcrumb: {
							label: "{{breadcrumb}}",
						},
						views: {
							"": {
								templateUrl: moduleFolder + "views/overview.html",
								controller: "participationsOverviewController",
							},
						},
					})

					.state("pelorus.wcm-participation.edit", {
						url: "/{uuid}",
						access: {
							requiresLogin: true,
						},
						resolve: {
							InstanceData: ["contentFactory", "$stateParams", function(contentFactory, $stateParams) {
								return contentFactory.get({ uuid: $stateParams.uuid }).$promise;
							}],
							ListData: ["participationsFactory", "$stateParams", function(participationsFactory, $stateParams) {
								if ($stateParams.uuid) {
									return participationsFactory.query({ docController: "applications", id: $stateParams.uuid }).$promise;
								} else {
									return [];
								}
							}],
						},
						ncyBreadcrumb: {
							label: "{{breadcrumb}}",
						},
						views: {
							"": {
								templateUrl: "/app/core/resource/views/resource.html",
								controller: "participationsDetailController",
							},
							"form@pelorus.wcm-participation.edit": {
								templateUrl: moduleFolder + "views/detail.html",
							},
						},
					});
			},
		]);
})(window.angular);
