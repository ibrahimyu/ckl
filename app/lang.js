angular.module('app')

.config(function($translateProvider) {
	$translateProvider.useSanitizeValueStrategy('escape')
		.preferredLanguage(localStorage.getItem('lang') || 'en')
		.fallbackLanguage('en')
		.useMissingTranslationHandlerLog();
});
