angular.module('app.controllers')

.controller('moreCtrl', function($scope, $api, $state, $auth, $ionicPopup) {
	$scope.doLogout = function() {
		$ionicPopup.confirm({
			title: 'Confirm',
			template: 'Are you sure you want to log out?'
		}).then(function(res) {
			if (res) {
				$auth.logout();
				$state.go('login');
			}
		});
	};
});
