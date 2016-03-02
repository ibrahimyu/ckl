angular.module('app.directives')

.directive('paginator', ['$http', function($http) {
	return {
		templateUrl: 'directives/paginator/paginator.html',
		scope: {
			source: '='
		},
		link: function(scope) {
			scope.nextPage = function() {

			}
		}
	}
}]);
