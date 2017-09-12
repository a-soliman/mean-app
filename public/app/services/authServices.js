angular.module('authServices', [])

.factory('Auth', function($http) {
    authFactory = {};

    authFactory.login = function(regData) {
        return $http.post('', regData);
    }

    return authFactory;
});