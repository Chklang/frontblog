(function() {
  'use strict';

  angular
    .module('frontblog')
    .config(config);

  /** @ngInject */
  function config($logProvider, $sceProvider, restProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
	
	restProvider.restPath("./");
	$sceProvider.enabled(false);
  }

})();
