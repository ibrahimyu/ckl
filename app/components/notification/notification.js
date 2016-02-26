angular.module('app')

.controller('notificationsCtrl', function($scope, $localstorage) {
	$scope.notifications = [
		{
			'subject': 'Your order has been accepted!',
			'content': 'Order hereeee~',
			'link': 'tabs/order/41',
			'icon': 'ion-person'
		}
	];

	//$scope.notifications = $localstorage.getObject('notification.items');
});
