var app = angular.module('Page4',[]);

app.controller('page4',function ($scope) {
    $scope.stocks = [
        {name:'AAA',price:200,previous:120},
        {name:'BBB',price:300,previous:215},
        {name:'CCC',price:239,previous:466},
        {name:'DDD',price:158,previous:455},
    ];
    $scope.stockInfo = 'p4/stock.html';

    $scope.getRate = function (stock) {
        return Math.ceil((stock.price - stock.previous)/stock.previous*100);
    }
})
.directive('stockWidget',function () {
    return {
        templateUrl:'p4/stock.html'
    }
})