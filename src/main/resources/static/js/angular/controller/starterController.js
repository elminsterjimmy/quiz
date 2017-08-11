angular.module('quiz').controller('starterController', starterController);

function starterController(requestService, $state) {
	var vm = this;
	vm.quizzes = [];
	vm.selected = undefined;
	vm.startQuiz = function() {
		$state.go("quiz", {"quizName": vm.selected});
	}

	activate();

	function activate() {
		requestService.request("http://localhost:9000/quizzes").then(
				function(data) {
					if (200 === data.status) {
						vm.quizzes = eval(data.data.data);
					} else if (500 === data.status) {
						console.log(data.data.error);
						$state.go("error");
					} else {
						$state.go("error");
					}
				});
	}
}