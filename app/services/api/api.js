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
		if (window.plugins)
		$cordovaPush.register({
			'badge': 'true',
			'sound': 'true',
			'alert': 'true',
			'senderID': appId,
		}).then(function(result) {}, function(error) {});
	}

	function updateUserLocation(position) {
		makeRequest('post', '/customer/update-location', {
			lat: position.coords.latitude,
			lng: position.coords.longitude,
			accuracy: position.coords.accuracy
		});
	}

	function getPosition(progress) {
		var defer = $q.defer();

		$geolocation.getAccuratePosition(
			function(position) {
				if (position)
					if (position.coords)
						defer.resolve(position);
			},
			function(reason) {
				defer.reject(reason);
			},
			function(position) {
				if (progress) progress(position);
			},
			{
				maxWait: 60000,
				desiredAccuracy: 100
			}
		);

		return defer.promise;
	}

	function ensurePosition() {
		var accuracy = 0;
		makeRequest('get', '/me').then(function(user) {
			accuracy = user.accuracy;
			getPosition().then(function(position) {
				if (user.accuracy > position.coords.accuracy)
					updateUserLocation(position);
			});
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
