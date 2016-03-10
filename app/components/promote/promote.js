angular.module('app')

.controller('promoteCtrl', function($scope, $translate, $cordovaSocialSharing) {
	var message = '';
	var subject = '';
	var file = null;
	var link = '';

	$translate('social_promote_message').then(function(str) { message = str; });
	$translate('social_promote_subject').then(function(str) { subject = str; });

	$scope.doPromote = function() {
		$cordovaSocialSharing.share(message, subject, file, link);
	};
});
