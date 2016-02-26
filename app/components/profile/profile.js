angular.module('app.controllers')

.controller('myProfileCtrl', function($scope, $api) {
	$scope.canEdit = true;
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
})

.controller('editProfileCtrl', function($scope, $api, $ionicPopup, $ionicHistory) {
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		});

	$scope.updateProfile = function() {
		$api.put('/customer/profile', $scope.user)
			.then(function(data) {
				$ionicPopup.alert({
					title: 'Success',
					template: 'Your profile has been updated.'
				}).then(function() {
					$ionicHistory.goBack();
				});
			});
	};
})

.controller('profileCtrl', function($scope, $api, $stateParams) {
	$api.get('/user/' + $stateParams.id)
		.then(function(data) {
			$scope.user = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
});
