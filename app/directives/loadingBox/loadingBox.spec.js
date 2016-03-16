describe('loadingBox directive', function() {
	beforeEach(module('app.controllers'));

	var $controller;
	var controller;
	var $scope;

	beforeEach(inject(function(_$controller_) {
		$controller = _$controller_;
	}));

	describe('$scope.active_language', function() {
		beforeEach(function() {
			$scope = {};
			controller = $controller('loginCtrl', {
				$scope: $scope
			});
		});

		it('gets default language from localstorage', function() {
			expect($scope.active_language.length).toEqual(2);
		});

		it('can set active language', function() {
			$scope.setLanguage('id');
			expect($scope.active_language).toEqual('id');
		});
	});
});
