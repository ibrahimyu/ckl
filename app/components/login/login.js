angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $state, $api) {
	if ($auth.isAuthenticated())
	{
		$state.go('tabs.home');
	}

	$scope.user = {};

	$scope.doLogin = function() {
		$scope.loggingIn = true;

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$auth.login(user)
			.then(function(response) {
				$api.get('/me')
					.then(function(user) {
						$api.registerPush();
						if (user.laundry_id)
						{
							$state.go('tabs.home');
						}
						else {
							$state.go('registerLaundry');
						}
					});
			})
			.catch(function(response) {
				$scope.loginError = true;
			})
			.finally(function() {
				$scope.loggingIn = false;
			});
	};
});
