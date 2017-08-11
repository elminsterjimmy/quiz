angular.module('quiz').config(routeConfig).run([ '$state', reloadState ]).run(
		updateCurrentState);// .run(checkAuthentication);

function routeConfig($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
	$stateProvider.state('index', {
		url : "",
		templateUrl : 'tpl/view/start.html',
		controller : 'starterController',
		controllerAs : 'ctl',
		resolve : { // Any property in resolve should return a promise and is
			// executed before the view is loaded
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				// you can lazy load files for an existing module
				return $ocLazyLoad.load({
					serie : true,
					files : [ 'js/angular/controller/starterController.js' ]
				});
			} ]
		}
	}).state('quiz', {
		url : "/quiz",
		templateUrl : 'tpl/view/quiz.html',
		params: {"quizName" : null},
		controller : 'quizController',
		controllerAs : 'ctl',
		resolve : { // Any property in resolve should return a promise and is
			// executed before the view is loaded
			loadMyCtrl : [ '$ocLazyLoad', function($ocLazyLoad) {
				// you can lazy load files for an existing module
				return $ocLazyLoad.load({
					serie : true,
					files : [ 'js/angular/controller/quizController.js' ]
				});
			} ]
		}
	}).state('finish', {
		url : "/done",
		templateUrl : 'tpl/view/done.html'
	}).state('error', {
		url : "/error",
		templateUrl : 'tpl/view/error.html'
	})
}

// fix the bug for ui-view in ng-include
// (https://github.com/angular-ui/ui-router/issues/679)
function reloadState($state) {

}

function updateCurrentState($state, $rootScope) {
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams,
			fromState, fromParams) {
		$state.current = toState;
	})
}

// fix the bug for the nest include and view
// (https://github.com/angular/angular.js/issues/1213)
function reloadRoute($route) {
	$route.reload();
}
