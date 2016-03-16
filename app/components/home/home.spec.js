describe('homeCtrl', function() {
	beforeEach(module('app.controllers'));

	var $controller;
	var controller;
	var $scope = {};

	var createController = function() {
		return $controller('homeCtrl', {
			$scope: $scope
		});
	};

	beforeEach(inject(function(_$controller_, $injector) {
		$controller = _$controller_;
		$httpBackend = $injector.get('$httpBackend');
		dashRequestHandler = $httpBackend.when('GET', ap + '/laundry/home').respond('dash test data');
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	describe('$scope.dash', function() {
		it('fetch dash data', function() {
			$httpBackend.expectGET(ap + '/laundry/home');
			createController();
			$httpBackend.flush();
			expect($scope.dash).toContain('dash');
		});

		xit('tells spinner to stop when finished loading', function() {
			$httpBackend.expectGET(ap + '/laundry/home');
			createController();
			$httpBackend.flush();

			$httpBackend.verifyNoOutstandingExpectation();
			$httpBackend.verifyNoOutstandingRequest();
			expect($scope.loadingComplete).toBe(true);
		});
	});
});
