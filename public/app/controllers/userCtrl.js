angular.module('userController', [])

.controller('regCtrl', function($scope, $http) {
    $scope.regUser = function(regData) {

        $http.post('/api/users', $scope.regData)
            .then(function(data) {
                console.log("Success : " + data.data.success);
                console.log("Messages : " + data.data.messages);
                console.log("Message : " + data.data.message);

                //display messages
                $scope.handleMsgs(data);
                
            })
    }
    /*
    HANDLEMSGS :    1. RECIVES THE DATA THAT COMES FROM THE SERVER.
                    2. FIGURES OUT IF IT WAS SUCCESS OR AN ERROR MESSAGE.
                    3. STORES THE MESSAGE(S) IN THE APPROPRIATE VARIABLE.
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
    }

})