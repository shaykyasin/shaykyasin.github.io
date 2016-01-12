(function() {

var app = angular.module('Tictactoe', []);

app.controller('MainController', function($scope) {
	var a = this;
	a.game = [];
	a.pulse = [];
	a.comp = '';
	a.user = '';
	a.msg = 'Choose your mark!';
	a.turn = 0;
	var wins = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 5, 9],
		[3, 5, 7],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9]
	];
	var winArray = 0;

	a.init = function(){
		winArray = 0;
		a.msg = 'You go first...';
		setTimeout(function(){a.msg='';}, 500);
		a.turn = 0;
		for(var i=0; i < 9; i++) {
			a.game[i] = '';
			a.pulse[i] = false;
		}
	};
	a.shouldPulse = function(index) {
		return a.pulse[index];
	}
	a.userSelect = function(index) {
		if(!winArray && a.game[index] == '') {
			a.game[index] = a.user;
			a.turn++;
			a.msg = 'Thinking...';
			winArray = won(a.game, a.user);
			if(winArray) {
				for(var i=0; i < 3; i++){
					a.pulse[wins[winArray-1][i] - 1] = true;
				}
				a.msg = "You win!";
				//a.init();
				setTimeout(function(){a.init();$scope.$apply();}, 1000);
			}
			if (a.turn < 5) {
				a.game[selectWinningMove(a.game, a.comp, true, 0) - 1] = a.comp;
				winArray = won(a.game, a.comp);
				if(winArray) {
					for(var i=0; i < 3; i++){
						a.pulse[wins[winArray-1][i] - 1] = true;
					}
					//swal({title: "You Lose!", type: "error"});
					a.msg = "You lose!";
					setTimeout(function(){a.init();$scope.$apply();}, 1000);
					//a.init();
				} else {
					a.msg = '';
				}
			}
			else {
				a.msg = "Its a tie!";
				//a.init();
				setTimeout(function(){a.init();$scope.$apply();}, 1000);
			}
		}
	};

	function getOpponent(player) {
		if (player === a.user) {
			return a.comp;
		}
		return a.user;
	}

	function won(game, player) {
	    var len = wins.length;
	    for(var j = 0; j < len; j++) {
	    	var win = wins[j]
	    	var i = 0;
	    	while(i < 3 && game[win[i] - 1] === player) {
	    		i++;
	    	}
	    	if (i === 3) {
	        	return j + 1;
	        }
	    }
	    return 0;
	}

	function selectWinningScore(game, player, playerturn, depth) {
		var possibilities = findPossibilities(game, player, playerturn, depth);
		if (possibilities[1].length) {
			return (playerturn) ? findArrayMax(possibilities[1]) : findArrayMin(possibilities[1]);
		}
		else {
			return 0;
		}
	}

	function selectWinningMove(game, player, playerturn, depth) {
		var possibilities = findPossibilities(game, player, playerturn, depth);
		//console.log(possibilities);
		return possibilities[0][possibilities[1].indexOf(findArrayMax(possibilities[1]))];
	}
	function findArrayMax(numArray) {
		return Math.max.apply(0, numArray);
	}

	function findArrayMin( array ){
		return Math.min.apply( 0, array );
	};

	function findScore(game, player, playerturn, depth) {
		var currentPlayer = playerturn ? player : getOpponent(player);
		var score = 0;
		if(won(game, currentPlayer)) {
			if(playerturn) {
				score = (10 - depth);
			}
			else {
				score = (depth - 10);
			}
		}
		else {
			var score = selectWinningScore(game, player, !playerturn, depth + 1);
		}    
		return score;
	}

	function findPossibilities(game, player, playerturn, depth) {
		var moves = [];
		var scores = [];
		var currentPlayer = playerturn ? player : getOpponent(player);
		for (var i = 0; i < 9; i++) {
			if (game[i] === "") {
	        moves.push(i+1);
	        var newgame =  game.slice(0);
	        newgame[i] = currentPlayer;
	        scores.push(findScore(newgame, player, playerturn, depth));
	 	   }
		}
	    return [moves, scores];
	}

	a.selecMark = function(mark) {
		a.user = mark;
		if(a.user == '╳') {
			a.comp = '◯';
		}
		else {
			a.comp = '╳';
		}
		angular.element(document.getElementById('markSelect')).css("display", "none");
		angular.element(document.getElementById('container')).css("display", "block");
	    a.init();
	};

});


})();