angular.module("authox",[])
	.factory('authoxCache', ['$http', '$q', function($http, $q) {
	var cacheObj = {};

	return {
		get: function(realm, resource,op) {

			op = op || 'ACCESS';
			
			var key = realm + '|||' + resource + '|||' + op;
			if(! cacheObj[key]) {
				// not cached

				var deferred = $q.defer();
				cacheObj[key] = deferred;
				var params = {};
				if(realm) {
					params['realm'] = realm;
				}
				params['resource'] = resource;
				params['op'] = op;
				$http.get("/rest/authox/access", {params: params})
				  .success(function() {
					//cacheObj[key] = 'allowed';
					deferred.resolve();
				}).error(function(){
					//cacheObj[key] = 'denied';
					deferred.reject();
				})
				return deferred.promise;
			} else {
				return cacheObj[key].promise;
				// if(cacheObj[key] === 'allowed') {
				// 	deferred.resolve({});
				// } else {
				// 	deferred.reject({});
				// }
			}
			//return deferred.promise;
		}
	}
}]).directive('authoxResource', ['$compile', 'authoxCache', function($compile, authoxCache) {
	return {
		restrict: 'AC',
		priority: 500,	
		link: function(scope, element, attr) {

			//return;

			scope.$watch(attr.authoxRealm, function() {

				var temp = attr.authoxResource.split('|');
				var resourceName = temp[0].trim();
				var op = temp[1] ? temp[1].trim() : 'ACCESS';
				element.addClass('hidden');
				authoxCache.get(scope.$eval(attr.authoxRealm), resourceName, op).then(function(){
					element.removeClass('hidden');
				})
			});
		}
	}
}]).directive('authoxEnableResource', ['$compile', function($compile) {
	return {
		restrict: 'AC',
		priority: 500,	// ng-repeat = 1000, default = 0
		scope: {
			resourceName: '@authoxEnableResource',
			realmName: '=authoxRealm'
		},
		transclude: true,
		controller: ['$scope', 'authoxCache', function($scope, authoxCache) {
			$scope.granted = false;
			// var params = {};
			// if($scope.realmName) {
			// 	params['realm'] = $scope.realmName;
			// }
			// params['resource'] = $scope.resourceName;
			// $http.get("/rest/authox/access", {params: params}, {cache: true}).success(function() {
			// 	$scope.granted = true;
			// })
			authoxCache.get($scope.realmName, $scope.resourceName).then(function(){
				$scope.granted = true;
			});
		}],
		link: function(scope, element, attrs, controller) {
			element.removeAttr('authox-resource');
			element.attr('ng-enable', 'granted');
			$compile(element)(scope);
		}
	}
}]);