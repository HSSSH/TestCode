var app=angular.module("myApp",[]);
app.factory('Datazz',function () {
    return {myMessage:"data from service"}
});

app.filter('reversetext',function (Datazz) {
    return function (t) {
        return t.split("").reverse().join("")+Datazz.myMessage;
    }
})

function FirstCtrl($scope,Datazz) {
    $scope.data=Datazz;
}

function SecondCtrl($scope,Datazz) {
    $scope.data = Datazz;

    // $scope.reverseMessage = function (myMessage) {
    //     return myMessage.split("").reverse().join("");
    // }
}
