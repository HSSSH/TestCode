var app = angular.module('superhero',[]);

app.directive('superman',function () {
    return {
        restrict:"E",
        template:"<div>HHHHHHH</div>"
    }
})
.directive('enter',function () {
    return {
        restrict: "A",
        link: function (scope, element) {
            element.bind("mouseenter", function () {
                console.log("enter");
                element.addClass("panel");
            })
        }
    }
})
.directive('leave',function () {
    return{
        restrict:"A",
        link:function (scope,element) {
            element.bind("mouseleave",function () {
                console.log("leave");
                element.removeClass("panel");
            })
        }
    }
});

