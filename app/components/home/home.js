angular.module('app.controllers')

.controller('homeCtrl', function($scope, $api) {
	$scope.doRefresh = function() {
		$api.get('/laundry/home')
			.then(function(data) {
				$scope.dash = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();

});
