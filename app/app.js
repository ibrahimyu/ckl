// API Base URL
var ap = 'http://simful.com:1600';

// Android push notification ID
var appId = '679308792960';

// if debug mode, we use localhost as API base URL.
if (localStorage.getItem('debug') == 'true') {
	ap = 'http://localhost:8000';
}

angular.module('app', ['ionic', 'app.controllers', 'app.directives', 'app.auth', 'app.services', 'satellizer', 'ngCordova', 'templates', 'pascalprecht.translate'])

.run(function($ionicPlatform, $ionicHistory, $ionicPopup, $auth, $state, $http, $rootScope, $api, $localstorage)
{

	function init()
	{
		if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
			cordova.plugins.Keyboard.disableScroll(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	}

	function authenticate()
	{
		// Check if user is logged in. If not, redirect to login.
		if ( ! $auth.isAuthenticated()) {
			$state.go('login');
		}
		else {
			// Register for push notifications, and asynchronously detect their geolocation
			$api.registerPush();
			$api.ensurePosition();

			// Even when user is logged in, we need to check if laundry has been set up!
			$api.get('/me')
				.then(function(user) {
					if ( ! user.laundry_id)
					{
						$state.go('registerLaundry');
					}
				});
		}
	}

	function defineExitState()
	{
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
	}

	function subscribePush()
	{
		$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
			if (notification.event == 'registered')
			{
				$api.post('/register-laundry-push', { token: notification.regid });
			}

			if (notification.event == 'message')
			{
				$localstorage.push('notifications', notification.message);
			}
		});
	}

	function checkAuthLaundry()
	{
		$rootScope.$on('$stateChangeStart', function(event, toState) {
			var check = toState.data && toState.data.checkAuthLaundry;
			if (check && !$auth.isAuthenticated()) {
				event.preventDefault();
				$state.go('login');
			}
		});
	}

	$ionicPlatform.ready(function() {
		init();
		authenticate();
		defineExitState();
		subscribePush();
		checkAuthLaundry();
	});
});

angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.services', []);
angular.module('templates', []);
