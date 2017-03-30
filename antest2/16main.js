var app=angular.module('choreApp',[]);

app.directive('kid',function () {
    return {
        restrict:'E',
        scope:{},
        template:'<input type="text" ng-model="todo"> {{todo}}'
    }
})
