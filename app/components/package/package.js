angular.module('app.controllers')

.controller('packagesCtrl', function($scope, $api, $ionicPopup) {
	$scope.doRefresh = function() {
		$api.get('/laundry/package')
			.then(function(data) {
				$scope.packages = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();

	$scope.confirmDelete = function(pkg) {
		$ionicPopup.confirm({
			title: 'Confirm',
			template: 'Are you sure you want to delete this package?'
		}).then(function(res) {
			if (res) {
				$api.delete('/laundry/package/' + pkg.id)
					.then(function(data) {
						$scope.doRefresh();

						$ionicPopup.alert({
							title: 'Success',
							template: 'The package has been deleted.'
						}).then(function() {
							$scope.doRefresh();
						});
					});
			}
		});
	};
})

.controller('addPackageCtrl', function($scope, $api, $state) {
	$scope.package = {};
	$scope.loadingComplete = true;
	$scope.save = function() {
		$api.post('/laundry/package', $scope.package)
			.then(function(data) {
				$state.go('tabs.packages');
			});
	};
})

.controller('editPackageCtrl', function($scope, $api, $state, $stateParams) {
	$api.get('/laundry/package/' + $stateParams.id)
		.then(function(data) {
			$scope.package = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});

	$scope.save = function() {
		$api.put('/laundry/package/' + $stateParams.id, $scope.package)
			.then(function(data) {
				$state.go('tabs.packages');
			});
	};
});
