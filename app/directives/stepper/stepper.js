angular.module('app.directives')

.directive('stepper', [function() {
	return {
		restrict: 'E',
		templateUrl: 'directives/stepper/stepper.html',
		scope: {},
		require: 'ngModel',
		link: function(scope, element, attr, ngModelController) {
			ngModelController.$render = function()
			{
				element.find('label').text(ngModelController.$viewValue);
			};

			ngModelController.$viewChangeListeners.push(function() {
				scope.$eval(attr.ngChange);
			});

			function updateModel(offset) {
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                ngModelController.$render();
            }

			scope.increment = function()
			{
				updateModel(1);
			};

			scope.decrement = function()
			{
				updateModel(-1);
			};

			scope.canIncrement = function()
			{
				return true;
			};

			scope.canDecrement = function()
			{
				return ngModelController.$viewValue >= 1;
			};
		}
	};
}]);

/*

ngModelCtrl.$viewChangeListeners.push(function() {
  scope.$eval(attrs.ngChange);
});

gModelController.$render = function() {
                iElement.find('div').text(ngModelController.$viewValue);
            };

            // update the model then the view
            function updateModel(offset) {
                // call $parsers pipeline then update $modelValue
                ngModelController.$setViewValue(ngModelController.$viewValue + offset);
                // update the local view
                ngModelController.$render();
            }*/
