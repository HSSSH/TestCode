var app = angular.module('Page1',[]);

app.controller('page1',function ($scope,$state) {

    $scope.deliverToPage2 = function (number) {
        $state.go('PageTab.page2',{number:number});
    }

                //写成{...}或{{...}}都不行
    $scope.note1 = [{id:1,name:'a'}];

                //写成[...]不行
    $scope.note2 = {A:{id:1,name:'a'}};

    $scope.note3 = [{id:1,age:12,name:'a'},{id:2,age:13,name:'b'},{id:3,age:14,name:'c'}];

    $scope.data = {a:1,b:2,c:3};
    $scope.datas = [{x:1,y:2,z:3},{x:2,y:3,z:4},{x:3,y:4,z:5}]

    for (var item in $scope.data){
        $scope.data[item] = 'sttyt'
    }

    for(var item in $scope.datas){
        $scope.datas[item].y = 0;
    }

})