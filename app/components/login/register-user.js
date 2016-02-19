angular.module('app.controllers')

.controller('registerUserCtrl', function($scope, $api, $auth, $state) {
	$scope.showPassword = true;
	$scope.user = {};

	if ($auth.isAuthenticated()) {
		$state.go('tabs.home');
	}

	$scope.doRegister = function() {
		$scope.loading = true;
		$auth.signup($scope.user)
			.then(function(response) {
				$auth.login($scope.user)
					.then(function(response) {
						$api.registerPush();
						$state.go('registerLaundry');
					})
					.catch(function(response) {
						$scope.loginError = true;
					})
					.finally(function() {
						$scope.loggingIn = false;
					});
			})
			.catch(function(response) {
				$scope.errors = response;
				$scope.registerError = true;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
});
