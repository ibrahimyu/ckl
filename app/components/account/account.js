angular.module('app.controllers')

.controller('accountCtrl', function($scope, $api) {
	$scope.changePassword = function() {
		$api.post('/changePassword', $scope.password)
			.then(function(data) {
				$scope.alert = {
					message: 'Changes saved.',
					type: 'information'
				};
			});
	};
});
