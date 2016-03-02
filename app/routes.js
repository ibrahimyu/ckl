angular.module('app')

.config(function($stateProvider, $urlRouterProvider) {

	$stateProvider

	.state('registerLaundry', {
		url: '/registerLaundry',
		controller: 'registerLaundryCtrl',
		templateUrl: 'components/laundry/register-laundry.html'
	})

	.state('registerUser', {
		url: '/registerUser',
		controller: 'registerUserCtrl',
		templateUrl: 'components/login/register-user.html'
	})

	.state('login', {
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: 'components/login/login.html'
	})

	.state('tabs', {
		url: '/tabs',
		abstract: true,
		templateUrl: 'components/layout/tabs.html',
		data: {
			checkAuthLaundry: true
		}
	})

	.state('tabs.home', {
		url: '/home',
		views: {
			'tab-home': {
				templateUrl: 'components/home/home.html',
				controller: 'homeCtrl'
			}
		}
	})

	.state('tabs.orders', {
		url: '/order-list',
		params: {
		    status: 'active',
		},
		views: {
			'tab-orders': {
				templateUrl: 'components/order/order-list.html',
				controller: 'ordersCtrl'
			}
		}
	})

	.state('tabs.updateOrder1', {
		url: '/update-order/step1/:id',
		views: {
			'tab-orders': {
				templateUrl: 'components/order/update-order-1.html',
				controller: 'updateOrder1Ctrl'
			}
		}
	})

	.state('tabs.updateOrder2', {
		url: '/update-order/step2/:id',
		views: {
			'tab-orders': {
				templateUrl: 'components/order/update-order-2.html',
				controller: 'updateOrder2Ctrl'
			}
		}
	})

	.state('tabs.orderDetail', {
		url: '/order/:id',
		views: {
			'tab-orders': {
				templateUrl: 'components/order/order-detail.html',
				controller: 'orderDetailCtrl'
			}
		}
	})

	.state('tabs.newWalkin', {
		url: '/newWalkin',
		views: {
			'tab-orders': {
				templateUrl: 'components/order/new-walkin.html',
				controller: 'newWalkinCtrl'
			}
		}
	})

	.state('tabs.reports', {
		url: '/reports',
		views: {
			'tab-reports': {
				templateUrl: 'components/layout/reports.html'
			}
		}
	})

	.state('tabs.more', {
		url: '/more',
		views: {
			'tab-more': {
				templateUrl: 'components/layout/more.html',
				controller: 'moreCtrl'
			}
		}
	})

	.state('tabs.myProfile', {
		url: '/myProfile',
		views: {
			'tab-more': {
				controller: 'myProfileCtrl',
				templateUrl: 'components/profile/profile.html'
			}
		}
	})

	.state('tabs.account', {
		url: '/account',
		views: {
			'tab-more': {
				controller: 'accountCtrl',
				templateUrl: 'components/account/account.html'
			}
		}
	})

	.state('tabs.myLaundry', {
		url: '/myLaundry',
		views: {
			'tab-more': {
				controller: 'myLaundryCtrl',
				templateUrl: 'components/laundry/edit-laundry.html'
			}
		}
	})

	.state('tabs.laundrySettings', {
		url: '/laundry-settings',
		views: {
			'tab-more': {
				controller: 'laundrySettingsCtrl',
				templateUrl: 'components/laundry/laundry-settings.html'
			}
		}
	})

	.state('tabs.items', {
		cache: false,
		url: '/items',
		views: {
			'tab-more': {
				templateUrl: 'components/items/items.html',
				controller: 'itemsCtrl'
			}
		}
	})

	.state('tabs.addItem', {
		url: '/items/add',
		views: {
			'tab-more': {
				templateUrl: 'components/items/item-form.html',
				controller: 'addItemCtrl'
			}
		}
	})

	.state('tabs.editItem', {
		url: '/items/edit/:id',
		views: {
			'tab-more': {
				templateUrl: 'components/items/item-form.html',
				controller: 'editItemCtrl'
			}
		}
	})

	.state('tabs.packages', {
		cache: false,
		url: '/packages',
		views: {
			'tab-more': {
				templateUrl: 'components/package/packages.html',
				controller: 'packagesCtrl'
			}
		}
	})

	.state('tabs.addPackage', {
		url: '/packages/add',
		views: {
			'tab-more': {
				templateUrl: 'components/package/package-form.html',
				controller: 'addPackageCtrl'
			}
		}
	})

	.state('tabs.editPackage', {
		url: '/packages/edit/:id',
		views: {
			'tab-more': {
				templateUrl: 'components/package/package-form.html',
				controller: 'editPackageCtrl'
			}
		}
	})

	.state('tabs.manageUsers', {
		url: '/manageUsers',
		views: {
			'tab-more': {
				templateUrl: 'components/users/users.html',
				controller: 'manageUsersCtrl'
			}
		}
	})

	.state('tabs.about', {
		url: '/about',
		views: {
			'tab-more': {
				templateUrl: 'components/about/about.html'
			}
		}
	})

	.state('tabs.contact', {
		url: '/contact',
		views: {
			'tab-more': {
				templateUrl: 'components/contact/contact.html'
			}
		}
	})

	.state('tabs.viewProfile', {
		url: '/viewProfile/:id',
		views: {
			'tab-more': {
				templateUrl: 'components/profile/profile.html',
				controller: 'profileCtrl'
			}
		}
	})

	.state('tabs.editProfile', {
		url: '/editProfile',
		views: {
			'tab-more': {
				templateUrl: 'components/profile/edit-profile.html',
				controller: 'editProfileCtrl'
			}
		}
	})

	.state('tabs.notifications', {
		url: '/notifications',
		views: {
			'tab-reports': {
				templateUrl: 'components/notification/notification.html',
				controller: 'notificationsCtrl'
			}
		}
	});


	$urlRouterProvider.otherwise('/tabs/home');

});
