angular.module('app.controllers')

.controller('myLaundryCtrl', function($scope, $api, $state) {
	$api.get('/laundry/profile')
		.then(function(data) {
			$scope.laundry = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});

	$scope.saveChanges = function() {
		$api.post('/laundry/profile', $scope.laundry)
			.then(function(data) {
				$state.go('tabs.more');
			});
	};
});
