var app = angular.module('MyApp',["ngCookies"]);
app.controller('MyController',function ($scope,$log,$cookieStore) {
	var data = [{ww:1,ee:2},{ww:3,ee:4}];
	$scope.putInfo = function()
	{
		$cookieStore.put("data",data);
	};
	$scope.getInfo = function()
	{
		var persons = $cookieStore.get("data") ;
		alert(persons[0].ww);
	};
});
// if (!$httpProvider.defaults.headers.get) {
// 		$httpProvider.defaults.headers.get = {};
// 	}
// 	// Enables Request.IsAjaxRequest() in ASP.NET MVC
// 	$httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
// 	// Disable IE ajax request caching
// 	$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
// 	$httpProvider.defaults.header s.get['Pragma'] = 'no-cache';
// 	$httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
//
// 	$httpProvider.interceptors.push(function($q, $window) {
// 		return {
// 			// optional method
// 			'request': function(config) {
// 				// do something on success
// 				return config;
// 			},
// 			// optional method
// 			'requestError': function(rejection) {
// 				// do something on error
// 				if (canRecover(rejection)) {
// 					return responseOrNewPromise
// 				}
// 				return $q.reject(rejection);
// 			},
// 			// optional method
// 			'response': function(response) {
// 				// do something on success
// 				return response;
// 			},
// 			// optional method
// 			'responseError': function(rejection) {
// 				// do something on error
// 				if (rejection.status === 401) {
// //		        return responseOrNewPromise
// 					console.log('401');
// 					$window.location.href = 'login?expired';
// 				}
// 				return $q.reject(rejection);
// 			}
// 		};
// 	});