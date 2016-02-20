angular.module('app.controllers')

.controller('moreCtrl', function($scope, $api, $state, $auth, $ionicPopup, $ionicActionSheet, $translate) {
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

	$scope.setLanguage = function() {
		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ id: 'en', text: 'English' },
				{ id: 'id', text: 'Indonesia' }
			],
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				var langs = ['en', 'id'];
				$translate.use(langs[index]);
				localStorage.setItem('lang', langs[index]);
				hideSheet();
			}
		});
	};
});
