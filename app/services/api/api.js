angular.module('app.services')

.factory('$api', function($http, $q, $rootScope, $cordovaPush, $localstorage, $geolocation) {
	var basePath = ap;

	function makeRequest(verb, uri, data) {
		var defer = $q.defer();
		verb = verb.toLowerCase();

		$http({
				url: basePath + uri,
				method: verb,
				data: data
			})
			.then(
				function(response) {
					$localstorage.setObject(uri, response.data);
					defer.resolve(response.data);
				},
				function(e) {
					if (verb == 'get' && $localstorage.get(uri, false))
					{
						var data = $localstorage.getObject(uri);
						defer.resolve(data);
					}
					else
					{
						defer.reject(e);
					}
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
			'senderID': '574964286293',
		}).then(function(result) {
			console.log(result);
		}, function(error) {

		});
	}

	function getUserPosition() {
		var defer = $q.defer();
		$geolocation.getAccuratePosition(function(position) {
			$scope.currentLocation = position.coords;
			$api.post('/customer/update-location', position.coords)
				.then(function(user) {
					defer.resolve(user);
				});
		}, function(reason) {
			defer.reject(reason);
		}, function(position) {
			$scope.currentLocation = position.coords;
		}, {
			desiredAccuracy: 100,
			maxWait: 30000
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
		getUserPosition: getUserPosition
	};
});
