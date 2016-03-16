angular.module('app')

.controller('promoteCtrl', function($scope, $api, $translate, $cordovaSocialSharing) {
	var share = {
		message: '',
		subject: '',
		file: null,
		link: ''
	};
	$scope.share = share;

	$api.get('/laundry/profile')
		.then(function(data) {
			$scope.laundry = data;

			$translate('social_promote_subject', $scope.laundry).then(function(str) { share.subject = str; });
			$translate('social_promote_message', $scope.laundry).then(function(str) { share.message = str; });
		});



	$scope.doPromote = function() {
		$cordovaSocialSharing.share(message, subject, file, link);
	};
});
