var app = angular.module('routetest',['ui.router','Page1','Page2','Page3','Page4','Page5']);

app.config(function ($urlRouterProvider,$stateProvider) {

    $urlRouterProvider.when("","/PageTab");

    $stateProvider
        .state('PageTab',{
        url:'/PageTab',
        templateUrl:'pagetab.html'
        })
        .state('PageTab.page1',{
        url:'/A',
        templateUrl:'p1/page1.html'
        })
        .state('PageTab.page2',{
        url:'/B/:number',
        templateUrl:'p2/page2.html'
        })
        .state('PageTab.page3',{
        url:'/C',
        templateUrl:'p3/page3.html'
        })
        .state('PageTab.page4',{
        url:'/D',
        templateUrl:'p4/page4.html'
        })
        .state('PageTab.page5',{
        url:'/E',
        templateUrl:'p5/page5.html'
        })


})