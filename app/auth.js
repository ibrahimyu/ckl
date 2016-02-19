angular.module('app.auth', ['satellizer'])

.config(function($authProvider) {
	$authProvider.loginUrl = ap + '/auth/login';
	$authProvider.signupUrl = ap + '/auth/register';

	$authProvider.facebook({
      clientId: '915992068450240'
    });

    $authProvider.google({
      clientId: 'Google Client ID'
    });
});
