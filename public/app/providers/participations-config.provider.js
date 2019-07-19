"use strict";

(function(angular) {
	angular.module("wcm-participation_0.3.0")
		.provider("participationsConfig", [

			"MODULE_ENV_CONFIG",

			function participationConfig(MODULE_ENV_CONFIG) {

				this.API = {
					name: MODULE_ENV_CONFIG.angularModule,
					version: "0.3.0",
					feDirPath: MODULE_ENV_CONFIG.feDirPath,
					assetsDirPath: MODULE_ENV_CONFIG.assetsDirPath,
					cssDirPath: MODULE_ENV_CONFIG.cssDirPath,
				};

				this.API.modulePath = this.API.feDirPath;

				this.$get = function get() {
					return this.API;
				};
			},
		]);
})(window.angular);
