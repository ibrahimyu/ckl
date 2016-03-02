angular.module('app.services')

.factory('$localstorage', ['$window', function($window) {
	return {
		set: function(key, value) {
			$window.localStorage[key] = value;
		},
		get: function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject: function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject: function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		},
		token: function() {
			return this.get('token', null);
		},
		push: function(key, value) {
			obj = JSON.parse($window.localStorage[key] || '[]');
			obj.push(value);
			this.setObject(key, obj);
			return obj;
		}
	};
}]);
