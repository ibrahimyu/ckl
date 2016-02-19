angular.module('app.controllers')

.controller('myProfileCtrl', function($scope, $api) {
	$scope.canEdit = true;
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete')
		});
})

.controller('editProfileCtrl', function($scope, $api) {
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		});

	$scope.updateProfile = function() {
		$api.put('/me')
			.then(function(data) {
				$scope.user = data;
			});
	};
})

.controller('profileCtrl', function($scope, $api, $stateParams) {
	$api.get('/user/' + $stateParams.id)
		.then(function(data) {
			$scope.user = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete')
		});;
});
