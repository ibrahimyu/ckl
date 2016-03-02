angular.module('app.auth', ['satellizer'])

.config(function($authProvider) {
	$authProvider.baseUrl = ap;
	$authProvider.loginUrl = '/auth/login';
	$authProvider.signupUrl = '/auth/register';

	var commonConfig = {
		popupOptions: {
			location: 'no',
			toolbar: 'yes',
			width: window.screen.width,
			height: window.screen.height,
		}
	};

	if (window.cordova) {
		$authProvider.cordova = true;
	    $authProvider.platform = 'mobile';
		commonConfig.redirectUri = 'http://localhost/';
    }

	window.authConfig = commonConfig;

	$authProvider.facebook(angular.extend({}, commonConfig, {
		clientId: '180593665649567',
		scope: ['email']
	}));

	$authProvider.google(angular.extend({}, commonConfig, {
		clientId: '679308792960-bclckug8jt1cg64ivdv6v81dh9n14huo.apps.googleusercontent.com'
	}));
});
