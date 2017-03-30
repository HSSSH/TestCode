var app = angular.module('Page2',[]);

app.controller('page2',function ($scope,$stateParams) {

    $scope.getNumber = $stateParams.number;

    $scope.submit2 = function () {
        console.log('Submit:',$scope.user)
    }

    $scope.clickSubmit = function () {
        console.log('Submit:',$scope.user.name)
    }

    $scope.tab = 'first';

    $scope.open = function (tab) {
        $scope.tab = tab
    }

})
.controller('subCtrl',function ($scope) {
    $scope.items = [{id:1,name:'Item 1'},{id:2,name:'Item 2'}]

    $scope.add = function () {
        $scope.items.push({
            id:$scope.items.length+1,
            name:'Item '+($scope.items.length+1)
        })
    }
})
.controller('subCtrl2',function ($scope,ItemService) {
    $scope.list = function () {
        return ItemService.list();
    }
    $scope.add = function () {
        return ItemService.add();
    }
})
.factory('ItemService',function () {
    var items = [{id:1,name:'Item 1'},{id:2,name:'Item 2'}];
    return{
        list:function () {
            return items;
        },
        add:function () {
            items.push({
                id:items.length+1,
                name:'Item '+(items.length+1)
            })
        }
    }
})