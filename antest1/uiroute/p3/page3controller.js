var app = angular.module('Page3',[]);

app.controller('page3',function ($scope) {
    $scope.notes = [
        {label:'FC Todo',type:'chore',done:true},
        {label:'FT Todo',type:'task',done:false},
        {label:'FF Todo',type:'fun',done:true},
        {label:'SC Todo',type:'chore',done:false},
        {label:'ST Todo',type:'task',done:true},
        {label:'SF Todo',type:'fun',done:true},
        {label:'TC Todo',type:'chore',done:false},
        {label:'TT Todo',type:'task',done:false},
        {label:'TF Todo',type:'fun',done:false}
    ];
    $scope.sortOrder = ['+type','-label'];

    $scope.filterOptions = {
        "string":'',
        "object":{done:false,label:'C'},
        "function":function(note) {
            return note.type === 'task'&&note.done === false;
        }
    };

    $scope.currentFilter = 'string';

})
.filter('tranlation',function () {
    return function (variable) {
        if(variable == true) return '对';
        else return '错';
    }
})