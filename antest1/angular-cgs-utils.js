angular.module('angular-cgs-utils', [])
	.controller('test',function ($scope) {
		//滚动条参数
		$scope.stateTableSize = {
			size:'5px',
			height:'200px'
			// width: '50px'
			// position: 'left',
			// color: '#ffcc00',
			// alwaysVisible: true,
			// distance: '20px',
			// start: $('#child_image_element'),
			// railVisible: true,
			// railColor: '#222',
			// railOpacity: 0.3,
			// wheelStep: 10,
			// allowPageScroll: false,
			// disableFadeOut: false
		};
		$scope.subString = 'abcde';
		// $scope.changeText = '';
		$scope.format = 'yyyy年';
	})
/**
 * slimscroll 滚动条 支持Chrome FireFox Opera IE6+
 * @author hucj
 * ------------------------------------------------------------------
 */
	.directive('cgsSlim', function() {
		return {
			restrict: 'AC',
			scope: {
				options : '='
			},
			link: function(scope, element) {
				var options;
				if (scope.options) {
					options = scope.options;
				}
				else options = {
					height: '490px',
					size:'7px'
				};
				$(element).slimscroll(options);
			}
		}
	})
/**
 * 字符串截断	字符串超过len长度时，截取前len - 1个字符，并加上…
 * @author hucj
 * ------------------------------------------------------------------
 */
	.filter('textEllipsis',function() {
		return function(s, len) {
			return (s && s.length > len)?(s.substring(0, len - 1) + '…'):s;
		}
	})
/**
 * 自动修改大小写
 * @author linyh
 * ------------------------------------------------------------------
 */
	.directive('cgsChangeCase', function ($http, $timeout) {
		return {
			require: '?ngModel',
			link: function (scope, element, attrs, ngModel) {
				var toCase = attrs.cgsChangeCase;	//in('uppercase', 'lowercase')
				if(ngModel && toCase) {
					scope.$watch(attrs.ngModel, function(n) {
						if(!n)
							return;
						if(toCase == 'uppercase') {
							var upper = angular.uppercase(n);
							if(upper != n) {
								ngModel.$setViewValue(upper);
								if(scope.changeCaseTimeout) {
									$timeout.cancel(scope.changeCaseTimeout);
								}
								scope.changeCaseTimeout = $timeout(function() {
									element.val(upper);
								}, 500);
							}
						}
						else if(toCase == 'lowercase') {
							var lower = angular.lowercase(n);
							if(lower != n) {
								ngModel.$setViewValue(lower);
								if(scope.changeCaseTimeout) {
									$timeout.cancel(scope.changeCaseTimeout);
								}
								scope.changeCaseTimeout = $timeout(function() {
									element.val(lower);
								}, 500);
							}
						}
					});
				}
			}
		}
	})
/**
 * clock
 * @author hucj
 * ------------------------------------------------------------------
 */
	.directive('cgsClock', function($interval, dateFilter) {
		return {
			restrict: 'EA',
//			transclude: true,
//			replace: true,
			scope: {
				format : '='
			},
			template: '{{cgsTime}}',
			link: function(scope, element, attrs) {
				var intervalId;
				//var format = scope.format != null?scope.format:'yyyy/MM/dd HH:mm:ss';
				// var format = scope.format?scope.format: 'yyyy年MM月dd日';
				function updateTime() {
					var format = scope.format?scope.format: 'yyyy年MM月dd日';
					var date = new Date();
					var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六")[date.getDay()];
					scope.cgsTime = (dateFilter(date, format)) + "  " + day;
				}

				element.on('$destroy', function() {
					if(intervalId) {
						$interval.cancel(intervalId);
					}
				});

				// start the UI update process; save the timeoutId for
				// canceling
				updateTime();
				intervalId = $interval(function() {
					updateTime(); // update DOM
				}, 500);
			}
		}
	})
/**
 * 失焦之后再验证3
 * @author hucj
 * ------------------------------------------------------------------
 */
	.directive('ngFocus', function() {
		var FOCUS_CLASS="ng-focused";
		return {
			require: 'ngModel',
			restrict: 'A',
			link:function(scope, element, attrs, ctrl){
				ctrl.$focused=false;
				element.bind('focus',function(evt){
					element.addClass(FOCUS_CLASS);
					scope.$apply(function(){
						ctrl.$focused=true;
					});
				}).bind('blur',function(evt){
					element.removeClass(FOCUS_CLASS);
					scope.$apply(function(){
						ctrl.$focused = false;
					});
				});
			}
		};
	})
/**
 * bootstrap switch
 * @author linyh
 * ------------------------------------------------------------------
 */
	.directive('cgsBsSwitch', function($timeout) {
		return {
			require: '?ngModel',
			restrict: 'EA',
			scope: {
				ngModel: '=',
				toggle: '&'
			},
			link: function(scope, element, attrs, ngModel) {
				$.fn.bootstrapSwitch.defaults.size = 'mini';
				$.fn.bootstrapSwitch.defaults.animate = false;
				var switchElement = angular.element('<input type="checkbox">');
				element.replaceWith(switchElement);
				switchElement.bootstrapSwitch();
				if(!ngModel)
					return;
				switchElement.on('switchChange.bootstrapSwitch', function(event, state) {
//				console.log(this); // DOM element
//				console.log(event); // jQuery event
//				console.log(state); // true | false
					//解决触发两次的问题
					$timeout(function() {
						if(scope.ngModel != state) {
							//在switchChange里不改变模型的值，由调用者在toggle方法中自行设置 这里会有闪烁问题
							switchElement.bootstrapSwitch('state', scope.ngModel, true);
							scope.toggle();
//					scope.$apply(function() {
////						ngModel.$setViewValue(state);
//						//TODO: toggle无法正确反映ngMdel变化
//					});
						}
					}, 0);
				});
				scope.$watch('ngModel', function(n) {
					switchElement.bootstrapSwitch('state', n, true);
				});
			}
		};
	})
/**
 * My97 datePicker
 * @author linyh
 * ------------------------------------------------------------------
 */
	.directive('cgsDatePicker', function(dateFilter) {
		return{
			require : '?ngModel',
			restrict: 'A',
			link: function(scope, element, attrs, ngModel) {
				if(typeof WdatePicker == 'function' && ngModel) {
					var options = {};
					options.dateFmt = attrs.dateFmt?attrs.dateFmt: 'yyyy-MM-dd HH:mm:ss';
					options.onpicked = function(dp) {
						var object = dp.cal.newdate;
						var date = new Date(object.y, object.M - 1, object.d, object.H, object.m, object.s);
						ngModel.$setViewValue(date);
					};
					options.oncleared = function(dp) {
						ngModel.$setViewValue(null);
					};
					scope.$watch(attrs.ngModel, function(n, o) {
						element.val(dateFilter(n, options.dateFmt));
					});
					var wdateFun = function() {
						WdatePicker(options);
					};
					element.focus(wdateFun);
					element.click(wdateFun);
				}
			}
		}
	})
/**
 * 验证唯一性
 * @author linyh
 * @author xiaog
 * ------------------------------------------------------------------
 */
	.directive('cgsEnsureUnique', function ($http, $timeout) {
		return {
			require: '?ngModel',
			link: function (scope, element, attrs, ngModel) {
				var validateUrl = attrs.validateUrl;	//like '/rest/check/name'
				var validateParam = attrs.cgsEnsureUnique;	//like tableName
				if(ngModel && validateUrl && validateParam) {
					scope.$watch(attrs.ngModel, function(n) {
						if(!n)
							return;
						if(scope.validateTimeout) {
							$timeout.cancel(scope.validateTimeout);
						}
						scope.validateTimeout = $timeout(function() {
							$http.get(validateUrl + '?' + validateParam + "=" + n)
								.success(function (data, status, headers, cfg) {
									ngModel.$setValidity('unique', data);
								})
								.error(function (data, status, headers, cfg) {
									ngModel.$setValidity('unique', false);
								});
						}, 1000);
					});
				}
			}
		}
	})
/**
 * 对话框服务，依赖ui.bootstrap
 * @author linyh
 * ------------------------------------------------------------------
 */
	.provider('dialogService', function() {
		this.alertTemplateUrl = 'template.dialog.alert.html';
		this.confirmTemplateUrl = 'template.dialog.confirm.html';
		this.promptTemplateUrl = 'template.dialog.prompt.html';
		this.setAlertTemplateUrl = function(templateUrl) {
			// 通过.config改变默认属性
			if(templateUrl) {
				this.alertTemplateUrl = templateUrl;
			}
		};
		this.setConfirmTemplateUrl = function(templateUrl) {
			// 通过.config改变默认属性
			if(templateUrl) {
				this.confirmTemplateUrl = templateUrl;
			}
		};
		this.setPromptTemplateUrl = function(templateUrl) {
			// 通过.config改变默认属性
			if(templateUrl) {
				this.promptTemplateUrl = templateUrl;
			}
		};
		this.$get = function($uibModal) {
			var self = this;
			var service = {};
			service.alert = function(title, msg) {
				$uibModal.open({
					templateUrl: self.alertTemplateUrl,
					controller: 'dialogServiceAlertCtrl',
					size: 'sm',
					backdrop:'static',
					resolve: {
						title: function() {
							return title;
						},
						msg: function() {
							return msg;
						}
					}
				}).result.then(function() {}, function() {});
			};
			service.confirm = function(title, msg, closeCallback, dismissCallback) {
				closeCallback = typeof closeCallback == 'function'?closeCallback: function() {};
				dismissCallback = typeof dismissCallback == 'function'?dismissCallback: function() {};
				$uibModal.open({
					templateUrl: self.confirmTemplateUrl,
					controller: 'dialogServiceConfirmCtrl',
					size: 'sm',
					backdrop:'static',
					resolve: {
						title: function() {
							return title;
						},
						msg: function() {
							return msg;
						}
					}
				}).result.then(closeCallback, dismissCallback);
			};
			service.prompt = function(title, msg, closeCallback, dismissCallback) {
				// closeCallback 可接受一个参数，由modalInstance返回
				closeCallback = typeof closeCallback == 'function'?closeCallback: function() {};
				dismissCallback = typeof dismissCallback == 'function'?dismissCallback: function() {};
				$uibModal.open({
					templateUrl: self.promptTemplateUrl,
					controller: 'dialogServicePromptCtrl',
					size: 'sm',
					backdrop:'static',
					resolve: {
						title: function() {
							return title;
						},
						msg: function() {
							return msg;
						}
					}
				}).result.then(closeCallback, dismissCallback);
			};

			return service;
		};
	})



/**
 *
 *
 */
	.directive('cgsEcharts', function(){
	return {
		restrict: 'A',
		scope: {
			options: '='
		},
		link: function(scope, element, attrs) {
			var chart;
			scope.$watch('options', function(n, o) {
				if(scope.options) {
					init();
				}
			});
			function dispose(){
				if(chart)
				{
					chart.dispose();
					$(window).unbind('resize.'+attrs.cgsEcharts);
				}
			}
			function init() {
				dispose();

				// 安全监测，未显示却加载则不init
				if(element.width()) {
					chart = echarts.init(element[0]);
					chart.showLoading({
						text:'正在努力读取数据中……'
					});
					// 为echarts对象加载数据
					chart.setOption(scope.options);
					chart.hideLoading();
					$(window).bind('resize.'+attrs.cgsEcharts,function() {
						console.log(attrs.cgsEcharts);
						chart.resize();
						chart.refresh();

					});
				}
			}
			init();

			scope.$on('$destroy', function() {
				dispose();
			});
		}
	}

})
/**
 * highcharts
 * @author hecb
 * ------------------------------------------------------------------
 */
.directive('cgsHighcharts', function ($window) {
	return {
		require: '?ngModel',
		restrict: 'EA',
		scope: {options: '='},
		link: function (scope, element, attrs, ngModel) {
			Highcharts.setOptions({global: {useUTC: false}});
			scope.$watch('options', function (o, n) {
				var options = scope.options;
				var chart;
				try {
					chart = $(element).highcharts(options);
					if (chart) {
						chart.destroy();
					}
				} catch (e) {

				}
				chart = $(element).highcharts(options);
				$(element).highcharts().setSize($(window).width() - 80, 400);
				$(element).highcharts().reflow();
				$(window).resize(function(){
					$(element).highcharts().setSize($(window).width() - 80, 400);
					$(element).highcharts().reflow();
				});
				if (ngModel) {
					ngModel.$setViewValue(chart);
				}
			});
			scope.$on('$destroy', function () {
				var chart = $(element).highcharts();
				if (chart) {
					chart.destroy();
				}
			});
		}
	};
})
/**
 * ztree
 * @author hecb
 * ------------------------------------------------------------------
 */
.directive('cgsTree', function($http) {
	return {
		require: '^ngModel',
		restrict: 'A',
		scope:{zNodes:'=',zSettings:'='},
		link:function(scope, element, attrs, ngModel){
			function initTree(){
				if( !!scope.zNodes && !!scope.zSettings){
					var zObj = $.fn.zTree.init(element, scope.zSettings, scope.zNodes);
					if( !!ngModel ){
						ngModel.$setViewValue(zObj);
					}
				}
			}
			scope.$watch('zNodes',function(o,n){
				initTree();
			});
			scope.$watch('zSettings',function(o,n){
				initTree();
			});
			scope.$on('$destroy', function(){
				var zTreeObj = $.fn.zTree.getZTreeObj(attrs['id']);
				if( !!zTreeObj ){
					zTreeObj.destroy();
				}
			});
		}
	};
})

.run(function($templateCache) {
	var alertTemplate =
		'<div class="modal-header">\
		<h3 class="modal-title">{{ title }}</h3>\
		</div>\
		<div class="modal-body">\
			<p class="text-center">{{ msg }}</p>\
		</div>\
		<div class="modal-footer">\
			<button class="btn btn-primary" type="button" ng-click="ok()">确定</button>\
		</div>';
	$templateCache.put('template.dialog.alert.html', alertTemplate);
	var confirmTemplate =
		'<div class="modal-header">\
		<h3 class="modal-title">{{ title }}</h3>\
		</div>\
		<div class="modal-body">\
			<p class="text-center">{{ msg }}</p>\
		</div>\
		<div class="modal-footer">\
			<button class="btn btn-primary" type="button" ng-click="ok()">确定</button>\
			<button class="btn btn-warning" type="button" ng-click="cancel()">取消</button>\
		</div>';
	$templateCache.put('template.dialog.confirm.html', confirmTemplate);
	var promptTemplate =
		'<div class="modal-header">\
		<h3 class="modal-title">{{ title }}</h3>\
		</div>\
		<div class="modal-body">\
			<p class="text-center">{{ msg }}</p>\
			<textarea class="form-control" ng-model="data"></textarea>\
		</div>\
		<div class="modal-footer">\
			<button class="btn btn-primary" type="button" ng-click="ok()">确定</button>\
			<button class="btn btn-warning" type="button" ng-click="cancel()">取消</button>\
		</div>';
	$templateCache.put('template.dialog.prompt.html', promptTemplate);
})
.controller('dialogServiceAlertCtrl', function($scope, $uibModalInstance, title, msg) {
	$scope.title = title?title: '提示框';
	$scope.msg = msg;
	$scope.ok = function() {
		$uibModalInstance.close();
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
})
.controller('dialogServiceConfirmCtrl', function($scope, $uibModalInstance, title, msg) {
	$scope.title = title?title: '确认框';
	$scope.msg = msg;

	$scope.ok = function() {
		$uibModalInstance.close();
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
})
.controller('dialogServicePromptCtrl', function($scope, $uibModalInstance, title, msg) {
	$scope.title = title?title: '输入框';
	$scope.msg = msg;
	$scope.data;

	$scope.ok = function() {
		$uibModalInstance.close($scope.data);
	};
	$scope.cancel = function() {
		$uibModalInstance.dismiss('cancel');
	};
})