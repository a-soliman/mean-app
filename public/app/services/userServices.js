/*  FACTORY TO PERFORM THE HTTP POST REQUEST, TO BE IMPORTED IN THE USER CONTROLLER */
angular.module('userServices', [])

.factory('User', function($http) {
    userFactory = {};

    userFactory.create = function(regData) {
        return $http.post('/api/users', regData);
    }

    return userFactory;
})