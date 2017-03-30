var app=angular.module('twitterApp',[]);

app.controller('appCtrl',function ($scope) {
    $scope.loadTwitters=function () {
        // alert("loading more")
    }

    $scope.deleteTwitters=function () {
        // alert("delete all")
    }
})
.directive('enter',function () {
    return function (scope,element1,attrs) {
        element1.bind("mouseenter", function () {
            // scope.loadTwitters();
            scope.$apply(attrs.enter)
        })
    }
})
.directive('myDirective', function() {
    return {
        restrict: 'A',
        replace: true,
        scope: {
            myUrl: '@abCd',//绑定策略
            myLinkText: '@'//绑定策略
        },
        template: '<a href="{{myUrl}}">' + '{{myLinkText}}</a>'
    };
});
