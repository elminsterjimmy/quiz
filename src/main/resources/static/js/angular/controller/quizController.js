angular.module('quiz').controller('quizController', quizController);

function quizController(requestService, $stateParams, $state, $sce) {
	var vm = this;
	vm.quizes = [];
	vm.currentQuiz = {};
	vm.single = true;
	vm.result = [];
	vm.tip = undefined;

	vm.toggleSelection = function(value) {
		var idx = vm.result.indexOf(value);
		if (idx > -1) {
			vm.result.splice(idx, 1);
		} else {
			vm.result.push(value);
		}
	}

	vm.check = function() {
		if (correctAnswer()) {
			var next = vm.currentQuiz.next;
			if (-1 === next) {
				$state.go("finish");
			} else {
				selectCurrentQuiz(next);
			}
		} else {
			setIncorrectAndTips();
		}
	}

	activate();

	function activate() {
		var quizName = $stateParams.quizName;
		if (quizName.startsWith("./")) {
			quizName = quizName.substring(2);
		}
		var url = encodeURI("http://localhost:9000/quiz/" + encodeURIComponent(quizName));
		requestService.request(url).then(
				function(data) {
					if (200 === data.status) {
						vm.quizes = eval(data.data.data);
						selectCurrentQuiz(1);
					} else if (500 === data.status) {
						console.log(data.data.error);
						$state.go("error");
					} else {
						$state.go("error");
					}
				});
	}

	function selectCurrentQuiz(quizNo) {
		var selected = vm.quizes.filter(function(entry) {
			return entry.no === quizNo;
		});
		vm.tip = undefined;
		vm.currentQuiz = selected[0];
		vm.single = vm.currentQuiz.answer.length === 1;
		vm.result = [];
	}

	function setIncorrectAndTips() {
		vm.tip = $sce.trustAsHtml("Incorrect! Please try again. <br><br>"
				+ vm.currentQuiz.tip);
	}

	function correctAnswer() {
		if (vm.single) {
			return vm.result === vm.currentQuiz.answer[0];
		} else {
			return vm.result.sort().toString() == vm.currentQuiz.answer.sort()
					.toString();
		}
	}
}