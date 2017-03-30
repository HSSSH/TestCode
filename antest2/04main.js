var app=angular.module("myApp",[]);
app.factory('Data',function () {
    return {myMessage:"data from service"}
});

function FirstCtrl($scope,Data) {
    $scope.data=Data;
}

function SecondCtrl($scope,Data) {
    $scope.data = Data;

    $scope.reverseMessage = function (myMessage) {
        return myMessage.split("").reverse().join("");
    }
}
