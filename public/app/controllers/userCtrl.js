angular.module('userController', [])

.controller('regCtrl', function($scope, $http) {
    $scope.regUser = function(regData) {

        $http.post('/api/users', $scope.regData)
            .then(function(data) {
                console.log("Success : " + data.data.success);
                console.log("Messages : " + data.data.messages);
                console.log("Message : " + data.data.message);

                //display messages
                if(data.data.sucess) {
                    $scope.successMsg = data.data.message;
                } else {
                    if(data.data.messages) {
                        $scope.errorMsgs = data.data.messages;
                    } else {
                        $scope.errorMsg = data.data.message;
                    }
                }
            })
    }
})