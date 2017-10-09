/* DEPERNDENCIES : 
        1-  USERSERVICES:   A FACTORY THAT PERFORMS AN HTTP POST REQUST */
angular.module('userController', ['userServices'])

.controller('regCtrl', function($scope, $http, $timeout, $location, $window, User) {
    /*
    regUser:    1. TAKES THE DATA FROM THE REGISTER FORM.
                2. RESETS THE ERROR MESSAGES TO NULL AND THE LOADING STATE TO TRUE FOR BETTER LAYOUT PERFORMANCE.
                3. CALLS beautify() METHOD TO CLEAN UP THE DATA BEFORE RETURNING THEM BACK.
                4. SENDS THE DATA TO THE BACK-END USING AN HTTP POST REQUIEST.
                5. RECIVES THE RESPOND FROM THE BACK-END AND SETS THE LOADING STATE TO FALSE.
                6. CALLS HandleMsgs() METHOD.
                7. CALLS REDIRECTPATH() METHOD TO REDIRECT THE LOCATION TO HOME.
    */
    $scope.regUser = function(regData) {
        $scope.loading = true;
        $scope.errorMsg = null;
        $scope.errorMsgs = null;

        regData = $scope.beautify(regData);

        User.create($scope.regData).then(function(data) {

                //display messages
                $scope.loading = false;

                $scope.handleMsgs(data);

                if(data.data.success) {
                    $scope.redirectPath();
                }
                
            })
    }


    $scope.beautify = function(regData) {
        // grap the data and clean them up
        return regData;
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
            if(data.data.messages) {

                $scope.errorMsg = null;
                $scope.errorMsgs = data.data.messages;

            } else {

                $scope.errorMsgs = null;
                $scope.errorMsg = data.data.message;
            }
        }
        return;
    }

    /*
    redirectPath:   1. SETS A TIMEOUT FUNCTION OF 200 AND REDIRECTS TO THE HOME PAGE.
    */

    $scope.redirectPath = function() {
        $timeout(function() {
            $location.path('/');
        }, 200)
    }

})

.controller('facebookCtrl', function($scope, $routeParams, Auth, $location, $window) {

    if($window.location.pathname == '/facebookerror') {
        $scope.facebookErrorMSG = 'Facebook email not found in database.';
    } else {
        Auth.facebook($routeParams.token);
        $location.path('/')
    }
})

.controller('googleCtrl', function($scope, $routeParams, Auth, $location, $window) {
    
    if($window.location.pathname == '/googleerror') {
        $scope.errorMSG = 'Google email not found in database.';
        // console.log($scope)
    } else {
        Auth.google($routeParams.token);
        $location.path('/')
    }
});