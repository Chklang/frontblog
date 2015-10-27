(function() {
  'use strict';

  angular
    .module('frontblog')
    .controller('ModalInstanceCtrl', ModalInstanceCtrl);

  /** @ngInject */
function ModalInstanceCtrl($scope, $modalInstance, elementPublication, indexCourant) {
	this.indexCourant = indexCourant;
	this.element = elementPublication;
	this.next = function () {
		if (this.indexCourant < (this.element.medias.length-1)) {
			this.indexCourant++;
		}
	}
	this.previous = function () {
		if (this.indexCourant > 0) {
			this.indexCourant--;
		}
	}
	this.getSrcVideo = function (media) {
		return "conf/full/" + media.video;
	}
};
})();