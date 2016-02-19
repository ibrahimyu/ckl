angular.module('app.directives')

.directive('loadingBox', [function() {
	return {
		transclude: true,
		templateUrl: 'directives/loadingBox/loading.html',
		link: function(scope) {
			scope.$on('loadingStart', function(e, args) {
				scope.loadingComplete = false;
			});
			scope.$on('scroll.refreshComplete', function(e, args) {
				scope.loadingComplete = true;
			});
			scope.$on('loadingComplete', function(e, args) {
				scope.loadingComplete = true;
			});
		}
	};
}]);
