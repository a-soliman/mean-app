/*
    THE MAIN CONTROLLER IS RESPONSPLE FOR LOGIN AND KEEPING THE USER 
    LOGGED IN, THERE FOR THIS CONTROLLER IS ENJECT DIRECTLY IN THE 
    NDEX.HTML IN THE BODY TAG INSTEAD OF BEING INJECTED IN THE ROUTES FILE.

*/
angular.module('mainController', ['authServices'])

.controller('mainCtrl', function($scope, $timeout, $location, Auth, $rootScope) {
    
    /*  
        CHECK IF THERE IS A TOKEN FOR A LOGGED IN USER 
            1.  IF ** POSITIVE ** 
                A.  RETURNS THE TOKEN.
                B.  INITILIZE USER OBJECT ON THE SCOPE.
                C.  BUILD THE USE OBJECT WITH THE RECIVED PROPS FROM THE TOKEN.(EMAIL, PASSWORD, ETC.)
            
            2.  IF ** NEGATIVE **
                A.  CLEAR THE USER OBJECT ON THE SCOPE (NULL).
    */
    $rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()) {
            Auth.getUser().then(function(data) {
                let username = data.data.username;
                $scope.user = {};
                $scope.user.username = data.data.username;
                $scope.user.email = data.data.email
            })
        } else {
            $scope.user = null;
        }
    })


    /*
    doLogin:    1. TAKES THE DATA FROM THE LOGIN FORM.
                2. RESETS THE ERROR MESSAGES TO NULL AND THE LOADING STATE TO TRUE FOR BETTER LAYOUT PERFORMANCE.
                3. CALLS beautify() METHOD TO CLEAN UP THE DATA BEFORE RETURNING THEM BACK.
                4. SENDS THE DATA TO THE BACK-END USING AN HTTP POST REQUIEST.
                5. RECIVES THE RESPOND FROM THE BACK-END AND SETS THE LOADING STATE TO FALSE.
                6. CALLS HandleMsgs() METHOD.
                7. CALLS REDIRECTPATH() METHOD TO REDIRECT THE LOCATION TO HOME.
    */
    $scope.doLogin = function(loginData) {
        $scope.loading = true;
        $scope.errorMsg = null;
        $scope.errorMsgs = null;

        loginData = $scope.beautify(loginData);

        Auth.login(loginData).then(function(data) {
            //display messages
            $scope.loading = false;

            $scope.handleMsgs(data);

            if(data.data.success) {
                $scope.redirectPath('/about');
            }
            
        })
    }


    $scope.beautify = function(loginData) {
        // grap the data and clean them up
        return loginData;
    }

    /*
    HandleMsgs :    1. RECIVES THE DATA THAT COMES FROM THE SERVER.
                    2. FIGURES OUT IF IT WAS SUCCESS OR AN ERROR MESSAGE.
                    3. STORES THE MESSAGE(S) IN THE APPROPRIATE VARIABLE.
                    4. IF THE MESSAGE-STATE WAS SUCCESS, THEN RELOCATE TO ('/').
    */
    $scope.handleMsgs = function(data) {
        if(data.data.sucess) {
            $scope.successMsg = data.data.message;

        } else {

            $scope.errorMsg = data.data.message;
           
        }
        return;
    }

    /*
    redirectPath:   1. SETS A TIMEOUT FUNCTION OF 200 AND REDIRECTS TO WHATEVER PATH PASSED AS A PARAMETER.
    */

    $scope.redirectPath = function(location) {
        if(!location) { location = '/home'; }

        $timeout(function() {
            $location.path(location);
        }, 500);
        $scope.clearMessages();
    }

    /*
    LOGOUT:     
        1.  INVOKES THE AUTH.LOGOUT FUNCTION, WHICH WILL REMOVE THE USER TOKEN FROM THE LOCALSTORAGE.
        2.  INVOKES CLEARMESSEGES FUNCTION TO CLEAR OUT THE SUCCESS AND ERROR MESSAGES FROM THE SCOPE.
        3.  SETS THE PATH TO '/LOGOUT' IN ORDER TO REDIRECT.
        4.  INVOKES THE REDIRECTPATH FUNCTION: PASSING THE '/LOGIN' TO REDIRECT TO.
    */
    $scope.logout = function() {
        Auth.logout();
        $scope.clearMessages();
        $location.path('/logout');
        $scope.redirectPath('/login');
    }

    /*
        CLEAR MESSAGES: RESET TE SCOPE SUCCESS AND FAUILURE MESSAGES TO NULL;
    */
    $scope.clearMessages = function() {
        $scope.errorMsg     = null;
        $scope.errorMsgs    = null;
        $scope.successMsg   = null;
    }
})

