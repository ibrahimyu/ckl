angular.module('app.controllers')

.controller('ordersCtrl', function($scope, $api, $stateParams, $ionicActionSheet) {
	$scope.orderStatus = $stateParams.status || 'new';
	$scope.sortBy = $stateParams.sort || 'created_at';
	$scope.sortAsc = false;

	$scope.filterOrder = function(status) {
		$scope.orderStatus = status;
		$scope.doRefresh();
	};

	$scope.doRefresh = function() {
		$scope.loadingComplete = false;
		$api.get('/laundry/order?status=' + $scope.orderStatus + '&sort=' + $scope.sortBy + '&asc=' + $scope.sortAsc)
			.then(function(data) {
				$scope.orders = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();

	$scope.showSearch = false;
	$scope.toggleSearch = function() {
		$scope.showSearch = !$scope.showSearch;
	};

	$scope.showSortBy = function() {

		var hideSheet = $ionicActionSheet.show({
			buttons: [
				{ value: 'name', text: 'Customer Name', asc: true },
				{ value: 'delivery_date', text: 'Delivery Date', asc: false },
				{ value: 'created_at', text: 'Order Date', asc: false },
				{ value: 'status', text: 'Status', asc: true },
				{ value: 'weight', text: 'Weight', asc: true }
			],
			titleText: 'Sort by',
			cancelText: 'Cancel',
			cancel: function() {

			},
			buttonClicked: function(index, item) {
				$scope.sortBy = item.value;
				$scope.sortAsc = item.asc ? 'true' : 'false';
				$scope.doRefresh();
				hideSheet();
			}
		});

	};

	$scope.doSearch = function() {
		$api.get('/laundry/order/search?q=' + $scope.searchQuery)
			.then(function(data) {
				$scope.orders = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};
})

.controller('orderDetailCtrl', function($scope, $api, $stateParams, $ionicActionSheet) {
	$scope.doRefresh = function() {
		$api.get('/laundry/order/' + $stateParams.id)
			.then(function(data) {
				$scope.order = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.changeStatus = function() {
		var hideSheet = $ionicActionSheet.show({
			buttons: [{
				text: 'Pre-order'
			}, {
				text: 'Moving to house'
			}, {
				text: 'In-house'
			}, {
				text: 'Washing'
			}, {
				text: 'Drying'
			}, {
				text: 'Ironing'
			}, {
				text: 'Pre-delivery'
			}, {
				text: 'Delivering'
			}, {
				text: 'Completed'
			}, {
				text: 'Cancelled'
			}],
			cancelText: 'Cancel',
			buttonClicked: function(index) {
				var statuses = ['Pre-order', 'Moving to house', 'In-house', 'Washing', 'Drying', 'Ironing', 'Pre-delivery', 'Delivering', 'Completed', 'Cancelled'];
				$scope.order.status = statuses[index];
				$api.put('/laundry/order/' + $stateParams.id, {
						status: statuses[index]
					})
					.then(function(data) {

					});

				hideSheet();
			}
		});
	};

	$scope.doRefresh();
})

.controller('updateOrder1Ctrl', function($scope, $api, $state, $stateParams) {
	$api.get('/laundry/order/' + $stateParams.id)
		.then(function(order) {
			$scope.order = order;
		});

	$api.get('/laundry/item-types/' + $stateParams.id)
		.then(function(data) {
			$scope.itemTypes = data;
		});

	$scope.doUpdate = function() {
		$scope.order.itemTypes = $scope.itemTypes;
		$api.put('/laundry/order/' + $stateParams.id, $scope.order)
			.then(function(data) {
				$state.go('tabs.updateOrder2', {
					id: $stateParams.id
				});
			});
	};
})

.controller('updateOrder2Ctrl', function($scope, $api, $stateParams, $state) {
	$api.get('/laundry/order/' + $stateParams.id)
		.then(function(data) {
			$scope.order = data;
			$scope.order.delivery_date = moment(data.delivery_date).toDate();
		});

	$api.get('/laundry/users')
		.then(function(data) {
			$scope.users = data.data;
		});

	$api.get('/laundry/package')
		.then(function(packages) {
			$scope.packages = packages;
		});

	$scope.calculatePrice = function() {
		$scope.order.amount_due = $scope.order.package.price * $scope.order.weight;
		$scope.order.amount_paid = $scope.order.package.price * $scope.order.weight;
		$scope.order.delivery_date = moment().add($scope.order.package.processing_time, 'h').toDate();
	};

	$scope.doUpdate = function() {
		$scope.order.status = 'In-house';
		$scope.order.package_id = $scope.order.package.id;
		$scope.order.processed_by = $scope.order.processor.id;
		$scope.order.delivery_by = $scope.order.deliveryman.id;
		$api.put('/laundry/order/' + $stateParams.id, $scope.order)
			.then(function(data) {
				$state.go('tabs.orderDetail', {
					id: $stateParams.id
				});
			});
	};
})

.controller('myLaundryCtrl', function($scope, $api, $state) {
	$api.get('/laundry/profile')
		.then(function(data) {
			$scope.laundry = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});

	$scope.saveChanges = function() {
		$api.post('/laundry/profile', $scope.laundry)
			.then(function(data) {
				$state.go('tabs.more');
			});
	};
})

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
});
