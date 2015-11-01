(function() {
  'use strict';

  angular
    .module('frontblog')
    .controller('MainController', MainController);
	
	

  /** @ngInject */
  function MainController($uibModal, Configuration) {
    var vm = this;

	vm.elements = [];
	vm.dates = [];
	vm.background = null;
	vm.logo = null;
	
	Configuration.getConf(function(data) {
		vm.background = data.background;
		vm.logo = data.logo;
	});
	
	Configuration.getContenu(function (data) {
		vm.elements = data;
		vm.dates = [];
		var dates = {};
		angular.forEach(data, function (pLine) {
			var date = pLine.date.split("/");
			var jour = parseInt(date[0], 10);
			var mois = parseInt(date[1], 10);
			var annee = parseInt(date[2], 10);
			var h = 0;
			var m = 0;
			if (pLine.heure) {
				var heure = pLine.heure.split(":");
				h = parseInt(heure[0], 10);
				m = parseInt(heure[1], 10);
			}
			var objDate = new Date(annee, mois-1, jour, h, m, 0);
			pLine.objDate = objDate;
			if (!dates[pLine.date]) {
				dates[pLine.date] = true;
				vm.dates.push({obj: objDate, string: pLine.date});
			}
		});
		vm.dates.sort(function (date1, date2) {
			return date1.obj.getTime() - date2.obj.getTime();
		});
		vm.elements.sort(function (pElement1, pElement2) {
			return pElement2.objDate.getTime() - pElement1.objDate.getTime();
		});
	});
	
	vm.showimages = function (elementPublication, indexCourant) {
		var modalInstance = $uibModal.open({
			templateUrl : 'app/showimage/showimage.html',
			controller : 'ModalInstanceCtrl',
			controllerAs : "ctrl",
			size : "lg",
			resolve: {
				elementPublication: function () { return elementPublication; },
				indexCourant: function () { return indexCourant; }
			}
		});
	};
	
	vm.changeDate = function (pNewDate, pGlobalController) {
		vm.filtreDate = pNewDate.string;
		pGlobalController.changeDate(pNewDate.obj);
	}
  }
})();
