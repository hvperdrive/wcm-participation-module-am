"use strict";

(function(angular) {
	angular.module("wcm-participation_0.0.14.factories")
		.factory("participationsFactory", [

			"$resource",
			"configuration",

			function participationFactory($resource, configuration) {

				var api = configuration.serverPath + configuration.apiPrefix + configuration.apiLevel;
				var factory = {};

				factory = $resource(api + "participations/:listController/:id/:docController", {
					id: "@uuid",
					listController: "@listController",
					docController: "@docController",
				}, {
					update: {
						method: "PUT",
					},
					patch: {
						method: "PATCH",
					},
				});

				return factory;
			},
		]);
})(window.angular);

