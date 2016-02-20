angular.module('app')

.config(function($translateProvider) {
	$translateProvider.useSanitizeValueStrategy('escape');
	$translateProvider.preferredLanguage(localStorage.getItem('lang') || 'en');
	$translateProvider.fallbackLanguage('en');
	$translateProvider.useMissingTranslationHandlerLog();
});
