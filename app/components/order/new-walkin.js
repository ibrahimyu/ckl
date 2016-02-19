angular.module('app.controllers')

.controller('newWalkinCtrl', function($scope, $api, $state) {
	$scope.order = {
		type: 'weight',
		customer_type: 'new'
	};

	$scope.customer = {};

	$api.get('/laundry/order-form')
		.then(function(data) {
			$scope.packages = data.packages;

			if (data.packages.length)
			{
				$scope.order.package = data.packages[0];
			}
		});

	$scope.submitOrder = function() {
		$scope.order.package_id = $scope.order.package.id;
		$api.post('/laundry/order', $scope.order)
			.then(function(data) {
				$state.go('tabs.updateOrder1', { id: data.id });
			});
	};
});
