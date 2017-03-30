var app=angular.module('03',[]);

app.controller('time',function($scope, $timeout,$location) {
    $scope.myUrl = $location.absUrl();
    $scope.myHeader = "AAAAA";
    $timeout(function () {
        $scope.myHeader = "BBBBB";
    }, 2000);

    $scope.$watch('myHeader', function(n) {
        if (n != 'AAAAA') {
            alert(n);
        }
    });
})