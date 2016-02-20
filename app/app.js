var ap = 'http://simful.com:1600';
var appId = '679308792960';

if (localStorage.getItem('debug') == 'true') {
	ap = 'http://localhost:8000';
}

angular.module('app', ['ionic', 'app.controllers', 'app.directives', 'app.auth', 'app.services', 'satellizer', 'ngCordova', 'templates', 'pascalprecht.translate'])

.run(function($ionicPlatform, $ionicHistory, $ionicPopup, $auth, $state, $http, $rootScope, $api) {
	$ionicPlatform.ready(function() {
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);

		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		if (!$auth.isAuthenticated()) {
			$state.go('login');
		}
		else {
			$api.registerPush();
			$api.ensurePosition();
		}

		$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
			if (notification.event == 'registered')
			{
				$api.post('/register-laundry-push', { token: notification.regid });
			}
		});

		if (localStorage.getItem('debug') == 'true') {
			$rootScope.isDebugging = true;
		}
	});

	var exitStates = ['tabs.home', 'registerLaundry', 'registerUser', 'login'];
	var mainStates = ['tabs.orderList', 'tabs.order', 'tabs.more'];
	$ionicPlatform.registerBackButtonAction(function(event) {
		if (mainStates.indexOf($state.current.name) > -1) {
			$state.go('tabs.home');
		}
		if (exitStates.indexOf($state.current.name) > -1) {
			$ionicPopup.confirm({
				title: 'Exit?',
				template: 'Are you sure you want to exit?'
			}).then(function(res) {
				if (res) {
					ionic.Platform.exitApp();
				}
			});
		} else {
			$ionicHistory.goBack();
		}
	}, 100);

	// for debug purposes.
	if (localStorage.getItem('debug') == 'true') {
		ap = 'http://localhost:8000';
		$rootScope.isDebug = true;
	}
});

angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('templates', []);
