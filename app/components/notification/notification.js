angular.module('app')

.controller('notificationsCtrl', function($scope, $localstorage) {
	$scope.notifications = $localstorage.getObject('notification.items');
});
