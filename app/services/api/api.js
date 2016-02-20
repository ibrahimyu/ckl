angular.module('app.services')

.factory('$api', function($http, $q, $rootScope, $cordovaPush, $localstorage, $geolocation) {
	function makeRequest(verb, uri, data) {
		var defer = $q.defer();
		verb = verb.toLowerCase();

		$http({
				url: ap + uri,
				method: verb,
				data: data
			})
			.then(
				function(response) {
					$localstorage.setObject(uri, response.data);
					defer.resolve(response.data);
				},
				function(e) {
					var data = $localstorage.getObject(uri);
					defer.resolve(data);
				})
			.finally(function() {
				$rootScope.$broadcast('loadingComplete');
			});

		return defer.promise;
	}

	function registerPush(userId) {
		$cordovaPush.register({
			'badge': 'true',
			'sound': 'true',
			'alert': 'true',
			'senderID': appId,
		}).then(function(result) {}, function(error) {});
	}

	function getPosition(progress) {
		var defer = $q.defer();

		$geolocation.getAccuratePosition(
			function(position) {
				makeRequest('post', '/customer/update-location', {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
					accuracy: position.coords.accuracy
				})
				.then(function(user) {
					defer.resolve(position);
				});
			},
			function(reason) {
				defer.reject(reason);
			},
			function(position) {
				if (progress) progress(position);
			}
		);

		return defer.promise;
	}

	function ensurePosition() {
		makeRequest('get', '/me').then(function(user) {
			if (!user.accuracy)
			{
				getPosition(function(position) {
					makeRequest('post', '/customer/update-location', {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						accuracy: position.coords.accuracy
					});
				})
				.then(function(position) {
					makeRequest('post', '/customer/update-location', {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
						accuracy: position.coords.accuracy
					});
				});
			}
		});
	}

	return {
		get: function(uri) {
			return makeRequest('get', uri);
		},
		post: function(uri, data) {
			return makeRequest('post', uri, data);
		},
		put: function(uri, data) {
			return makeRequest('put', uri, data);
		},
		patch: function(uri, data) {
			return makeRequest('patch', uri, data);
		},
		delete: function(uri) {
			return makeRequest('delete', uri);
		},
		registerPush: registerPush,
		getPosition: getPosition,
		ensurePosition: ensurePosition
	};
});
