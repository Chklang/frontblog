(function() {
  'use strict';

  angular
    .module('frontblog')
	.service('Configuration', ['restRequest', function (restRequest) {
		this.getContenu = function (pSuccess) {
			return restRequest.get({
				url : 'conf/database.json',
				success : pSuccess
			});
		};
		this.getConf = function (pSuccess) {
			return restRequest.get({
				url : 'conf/configuration.json',
				success : pSuccess
			});
		};
	}]);
})();