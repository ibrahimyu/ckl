angular.module('app.directives')

.filter('dateToISO', function() {
	return function(input) {
		if (input)
			return new Date(input).toISOString();
	};
});
