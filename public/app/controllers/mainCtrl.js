/*
    THE MAIN CONTROLLER IS RESPONSPLE FOR LOGIN AND KEEPING THE USER 
    LOGGED IN, THERE FOR THIS CONTROLLER IS ENJECT DIRECTLY IN THE 
    NDEX.HTML IN THE BODY TAG INSTEAD OF BEING INJECTED IN THE ROUTES FILE.

*/
angular.module('mainController', ['authServices'])

.controller('mainCtrl', function($scope, $timeout, $location, Auth) {
    
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
                    $scope.redirectPath();
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
    redirectPath:   1. SETS A TIMEOUT FUNCTION OF 200 AND REDIRECTS TO THE HOME PAGE.
    */

    $scope.redirectPath = function() {
        $timeout(function() {
            $location.path('/about');
        }, 200)
    }
})

