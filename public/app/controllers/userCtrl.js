angular.module('userController', [])

.controller('regCtrl', function($scope, $http) {
    
    /*
    regUser:    1. TAKES THE DATA FROM THE REGISTER FORM.
                2. SENDS THE DATA TO THE BACK-END USING AN HTTP POST REQUIEST.
                3. RECIVES THE RESPOND FROM THE BACK-END AND CALLS HandleMsgs() METHOD.
    */
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
    HandleMsgs :    1. RECIVES THE DATA THAT COMES FROM THE SERVER.
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