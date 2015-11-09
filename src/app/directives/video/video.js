(function() {
  'use strict';

  angular.module('frontblog')
  .directive("videogular", function () {
	  //var lVideoObject = pAttr.video;
	return {
		restrict: 'E',
		scope: {
			video: "=video"
		},
		/*templateUrl: 'app/directives/video/video.html',*/
		template : function (elem, attr) {
			var template = 'chargement en cours...';
			return template;
		},//'app/directives/video/video.html',
		link : function (scope, element, attr) {
			var template = '<video class="video-js" style="width:100%;height:100%;" controls data-setup="{}">';
			angular.forEach(scope.video.video, function (video) {
				template += '	<source src="conf/full/'+video.filename+'" type="'+video.type+'" label="'+video.label+'" res="'+video.resolution+'" />';
			});
			template +=
					'	<p class="vjs-no-js">'+
					'		To view this video please enable JavaScript, and consider upgrading to a web browser that'+
					'		<a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>'+
					'	</p>'+
					'</video>';
			element.html(template);
			var lVideoTag = element.children('video')[0];
			videojs(lVideoTag).videoJsResolutionSwitcher();
		}
	}
  });
})();