angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/about', {
		templateUrl: 'app/views/pages/about.html'
	})

	.when('/register', {
		templateUrl: 'app/views/pages/users/register.html',
		controller: 'regCtrl'
	})

	.when('/login', {
		templateUrl: 'app/views/pages/users/login.html'
	})
	.when('/profile', {
		templateUrl: 'app/views/pages/users/profile.html'
	})

	.when('/facebook/:token', {
		templateUrl: 'app/views/pages/users/profile.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
	})

	.when('/facebookerror', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'facebookCtrl',
		controllerAs: 'facebook'
	})

	.when('/google/:token', {
		templateUrl: 'app/views/pages/users/profile.html',
		controller: 'googleCtrl',
		controllerAs: 'google'
	})

	.when('/googleerror', {
		templateUrl: 'app/views/pages/users/login.html',
		controller: 'googleCtrl',
		controllerAs: 'google'
	})

	.when('/logout', {
		templateUrl: 'app/views/pages/users/social/social.html'
	})

	.otherwise({ redirectTo: '/' });

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});