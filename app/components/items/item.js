angular.module('app.controllers')

.controller('itemsCtrl', function($scope, $api, $ionicPopup) {
	$scope.doRefresh = function()
	{
		$api.get('/laundry/items')
			.then(function(data) {
				$scope.items = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();

	$scope.confirmDelete = function(item) {
		$ionicPopup.confirm({
			title: 'Confirm',
			template: 'Are you sure you want to delete this item?'
		}).then(function(res) {
			if (res) {
				$api.delete('/laundry/items/' + item.id)
					.then(function(data) {
						$scope.doRefresh();

						$ionicPopup.alert({
							title: 'Success',
							template: 'The item has been deleted.'
						}).then(function() {
							$scope.doRefresh();
						});
					});
			}
		});
	};
})

.controller('addItemCtrl', function($scope, $api, $state) {
	$scope.loadingComplete = true;
	$scope.item = {};

	$scope.save = function() {
		$api.post('/laundry/items', $scope.item)
			.then(function(data) {
				$state.go('tabs.items');
			});
	};
})

.controller('editItemCtrl', function($scope, $api, $state, $stateParams) {
	$api.get('/laundry/items/' + $stateParams.id)
		.then(function(data) {
			$scope.item = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});

	$scope.save = function() {
		$api.put('/laundry/items/' + $stateParams.id, $scope.item)
			.then(function(data) {
				$state.go('tabs.items');
			});
	};
});
