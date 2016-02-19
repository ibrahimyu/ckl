angular.module('app.controllers')

.controller('manageUsersCtrl', function($scope, $api) {
	$api.get('/laundry/users')
		.then(function(data) {
			$scope.users = data;
		});
})
