angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    authFactory = {};

    authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data) {
        	let token = data.data.token;

        	AuthToken.setToken(token);
        	return data;
        });

    };

    /* A CUSTOM FUNCTION TO CHECK IF THE USER IS LOGGED IN */
    authFactory.isLoggedIn = function() {
    	if(AuthToken.getToken()) {
    		return true;
    	} else {
    		return false;
    	}
    };

    authFactory.facebook = function(token) {
        AuthToken.setToken(token);
    }

    authFactory.getUser = function() {
        if(AuthToken.getToken()) {
            return $http.post('/api/me');
        } else {
            $q.reject({ message: 'User has no token'});
        }
    }

    /* LOGOUT :
			- CALLS THE SETTOKEN() FUNCTION TO REMOVE THE TOKEN FROM THE BROWSER
    */
    authFactory.logout = function() {
    	AuthToken.setToken();
    };

    return authFactory;
})

/* 
	RECIVING THE TOKEN FORM THE SERVER AFTER A SUCCESSEFUL LOGIN AND SAVING IT IN THE 
	BROWSER.
*/
.factory('AuthToken', function($window) {
	let authTokenFactory = {};

	/* 
		SETTOKEN: 
			-	IF INVOKED WITH A TOKEN PASSED : SAVES THE TOKEN TO THE LOCALSTORAGE = LOGIN;
			-	IF INVOKED WITHOUT A TOKEN PASSED: REMOVES THE TOKEN FROM THE LOCALSTORAGE = LOGOUT;
	*/
	authTokenFactory.setToken = function(token) {
		if(token) {
			$window.localStorage.setItem('token', token);
		} else {
			$window.localStorage.removeItem('token');
		}
	};

	authTokenFactory.getToken = function() {
		return $window.localStorage.getItem('token');
	};

	return authTokenFactory;
})

.factory('AuthInterceptors', function(AuthToken) {
    let authInterceptorsFactory = {};

    authInterceptorsFactory.request = function(config) {
        let token = AuthToken.getToken();

        if(token) {
            config.headers['x-access-token'] = token;
        }

        return config;
    }
    return authInterceptorsFactory;
})