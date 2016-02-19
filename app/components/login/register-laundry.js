angular.module('app.controllers')

.controller('registerLaundryCtrl', function($scope, $api, $state) {
	$scope.laundry = {};
	$scope.doRegister = function() {
		$api.post('/laundry/register', $scope.laundry)
			.then(function(data) {
				$state.go('tabs.home');
			});
	};
})
