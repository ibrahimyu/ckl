angular.module('app')

.controller('laundrySettingsCtrl', function($scope, $api, $http, $ionicPopup, $ionicHistory) {
	$scope.currencies = {
		"IDR": {
			"symbol": "Rp",
			"name": "Indonesian Rupiah",
			"symbol_native": "Rp",
			"decimal_digits": 0,
			"rounding": 0,
			"code": "IDR",
			"name_plural": "Indonesian rupiahs"
		},
		"USD": {
			"symbol": "$",
			"name": "US Dollar",
			"symbol_native": "$",
			"decimal_digits": 2,
			"rounding": 0,
			"code": "USD",
			"name_plural": "US dollars"
		},
		"Custom": {
			"symbol": '$',
			"name": "Custom",
			"symbol_native": "$",
			"code": "Custom",
			"name_plural": "Custom"
		}
	};

	$api.get('/laundry/profile')
		.then(function(laundry) {
			$scope.laundry = laundry;
			$scope.laundry.selected_currency = $scope.currencies[laundry.default_currency];
		});

	$scope.updateCurrency = function() {
		$scope.laundry.default_currency = $scope.laundry.selected_currency.code;
		$scope.laundry.currency_symbol = $scope.laundry.selected_currency.symbol_native;
	};

	$scope.saveChanges = function() {
		$api.post('/laundry/profile', $scope.laundry)
			.then(function(data) {
				$ionicHistory.goBack();
			});
	};
});
