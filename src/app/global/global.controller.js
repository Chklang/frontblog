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
	var conf = [];
	
	Configuration.getConf(function(data) {
		conf = data;
		var firstLine = null;
		angular.forEach(conf, function (pConf) {
			if (pConf.from) {
				var date = pConf.from.split("/");
				var jour = parseInt(date[0], 10);
				var mois = parseInt(date[1], 10);
				var annee = parseInt(date[2], 10);
				var objDate = new Date(annee, mois-1, jour, 0, 0, 0);
				pConf.from = objDate;
			}
			if (pConf.to) {
				var date = pConf.to.split("/");
				var jour = parseInt(date[0], 10);
				var mois = parseInt(date[1], 10);
				var annee = parseInt(date[2], 10);
				var objDate = new Date(annee, mois-1, jour+1, 0, 0, 0);
				pConf.to = objDate;
			}
			if (!firstLine) {
				firstLine = pConf;
			} else if (!pConf.from || (firstLine.from && pConf.from.getTime() < firstLine.from.getTime())) {
				firstLine = pConf;
			}
		});
		vm.background = firstLine.background;
		vm.logo = firstLine.logo;
		
		document.body.style.backgroundImage = "url('"+firstLine.background+"')";
	});
	
	vm.changeDate = function (pNewDate) {
		angular.forEach(conf, function(pConf) {
			if (pConf.from && pConf.from.getTime() > pNewDate.getTime()) {
				return;
			}
			if (pConf.to && pConf.to.getTime() < pNewDate.getTime()) {
				return;
			}
			
			vm.background = pConf.background;
			vm.logo = pConf.logo;
			
			document.body.style.backgroundImage = "url('"+vm.background+"')";
		});
	}
  }
})();
