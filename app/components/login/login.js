angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $state, $api, $translate) {

	/*if ($auth.isAuthenticated())
	{
		$state.go('tabs.home');
	}*/

	$scope.active_language = localStorage.getItem('lang') || 'en';
	$scope.setLanguage = function(lang) {
		$translate.use(lang);
		localStorage.setItem('lang', lang);
		$scope.active_language = lang;
	};

	$scope.user = {};

	$scope.doLogin = function() {
		$scope.loggingIn = true;

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$auth.login(user)
			.then(function(response) {
				$auth.setToken(response);
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

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
			.then(function(response) {
				$state.go('tabs.home');
			});
	};
});
