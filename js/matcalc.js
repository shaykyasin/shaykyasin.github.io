$( document ).ready(function() {

	var display = '';
	var temp = '';

	function calculate(exp) {
		var operands = exp.split(/[x+\-÷]+/);
		var operators = exp.replace(/\d+|\./g, '').split('');
		var ans = Number(operands[0]);
		var symbol = 0;
		for(var i=1; i< operands.length; i++) {
			var current = Number(operands[i]);
			switch(operators[symbol]) {
				case 'x':
				ans = ans * current;
				break;
				case '-':
				ans = ans - current;
				break;
				case '+':
				ans = ans + current;
				break;
				case '÷':
				ans = ans / current;
				break;
				default:
				alert("unrecongnized operator. error");
				break;
			}
			symbol++;
		}
		return ans;
	};

	function opPre(exp) {
		return eval(exp.replace('\u00f7','/').replace('x', '*'));
	};

	$('#bs').dblclick(function() {
		display = '';
		answer = 0;
		$("#display").text(display);
		$('#answer').val(0);
	});

	$('button').click(function() {
		if($(this).attr('id') === 'bs') {
			display = display.substring(0, display.length - 1);
		} else if ($(this).text() === '=') {
			$("#answer").removeClass().addClass('fadeOutUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass();
				$('#answer').val('');
			});
			display = calculate(display);
			$("#display").removeClass().addClass('fadeInUp animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				$(this).removeClass();
			});
			$("#display").text(display);
			return;
		} else if($(this).text()!=='.' && isNaN(temp) && isNaN($(this).text())) {
			display = display.substring(0, display.length - 1) + $(this).text();
		} else if($(this).text()!=='.' || $(this).text()==='.' && display.substr(display.length-1) !== '.'){
			display += $(this).text();
		}

		$("#display").text(display);

		temp = Number($(this).text());
		if(!isNaN(temp)) {
			$('#answer').val(calculate(display));
		}

	});

});