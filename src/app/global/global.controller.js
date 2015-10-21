(function() {
  'use strict';

  angular
    .module('frontblog')
    .controller('GlobalController', GlobalController);

  /** @ngInject */
  function GlobalController(Configuration) {
    var vm = this;

	vm.background = null;
	vm.logo = null;
	
	Configuration.getConf(function(data) {
		vm.background = data.background;
		vm.logo = data.logo;
		
		document.body.style.backgroundImage = "url('"+vm.background+"')";
	});
  }
})();
