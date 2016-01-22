$(document).ready(function(){ 
 
var simon = {
	freq: [329.63, 261.63, 220, 164.81],
	power: false,
	strict: false,
	seq: getSequence(),
	userTurn: false,
	curInd: 0,
	curLvl: 1,
	hiScore:0,
	};

var tempos = [1200, 1000, 750, 450];

 // create web audio api context
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
if (!audioCtx) {
    alert("Sorry, this game requires a modern browser to work. Please, consider updating your browser");
  }
 // create Oscillator, gain
var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();
// connect oscillator to gain node to speakers
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = 'sine';
oscillator.frequency.value = simon.freq[0];
oscillator.start();
gainNode.gain.value = 0;

function inputHandler(btn){
	//check if poweron and its users turn
	if(simon.power && simon.userTurn) {
		//check if button pressed is correct;
		if(Number(btn.substr(3)) === simon.seq[simon.curInd]){
			simon.curInd++;
			//completed this level?
			if(simon.curInd === simon.curLvl) {
				simon.curInd = 0;
				simon.curLvl++;
				$('#score').text(simon.curLvl - 1);
				//check and update hi score
				if(simon.hiScore < simon.curLvl - 1) {
					simon.hiScore = simon.curLvl -1;
					$('#high').text(simon.hiScore);
				}
				//progress to next level
				simon.userTurn = false;
				setTimeout(function(){playSequence(simon.seq, 0, simon.curLvl);}, 500);
			}
		} else {
			//if strict mode, start new game
			if(simon.strict) {
				simon.curLvl = 1;
				simon.seq = getSequence();
			}
			//replay current level for player
			simon.curInd = 0;
			simon.userTurn = false;
			oscillator.type = 'triangle';
			oscillator.frequency.value = 110;
			gainNode.gain.value = 1;
			$('button').addClass('glow');
			setTimeout(function(){
				oscillator.type = 'sine';
				gainNode.gain.value = 0;
				$('button').removeClass('glow');
				setTimeout(function(){playSequence(simon.seq, 0, simon.curLvl);},500);
			}, 500);
		}
	}
}

function playTone(btn){
	$('#' + btn).toggleClass('glow');
	oscillator.frequency.value = simon.freq[Number(btn.substr(3))];
	gainNode.gain.value = 1;
}

function getSequence() {
	var sequence = [];
	for(var i=0; i < 20; i++) {
		sequence.push( Math.round(Math.random()*3) );
	}
	return sequence;
}

function playSequence(seq, ind, untilIndex, tempo) {
	//setting tempo based on level
	if(!tempo) {
		var tempo = tempos[0];
		if(untilIndex > 13) tempo = tempos[3];
		else if(untilIndex > 9) tempo = tempos[2];
		else if(untilIndex > 5) tempo = tempos[1];
	}
	//check for power and level
	if( simon.power && ind < untilIndex ) {
		oscillator.frequency.value = simon.freq[seq[ind]];
		gainNode.gain.value = 1;
		$('#btn' + seq[ind]).addClass('glow');
		setTimeout(function(){
			gainNode.gain.value = 0;
			$('#btn' + seq[ind]).removeClass('glow');
		}, tempo - tempo/5);//stop playing at 80% tempo

		setTimeout(function(){
			playSequence(seq, ind + 1, untilIndex, tempo);
		}, tempo);//play next tone in sequence.
	} else {
		simon.userTurn = true;
	}
}

function stopAll(){
	//setTimeout(function(){
		gainNode.gain.value = 0;
		$('button').removeClass('glow');
	//}, 200);
}

$('button').mousedown(function(){
	var btn = $(this)['context']['id'];
	if(simon.power && simon.userTurn && Number(btn.substr(3)) === simon.seq[simon.curInd]){
		playTone(btn);
	}
});

$('button').mouseup(function(){
	stopAll();
	inputHandler($(this)['context']['id']);
});

$('#power').click(function(){
	simon.power = !simon.power;
	if(simon.power){
		simon.userTurn = false;
		playSequence(simon.seq, 0, simon.curLvl);
	} else {
		gainNode.gain.value = 0;
		simon.curInd = 0;
		simon.curLvl = 1;
		simon.seq = getSequence();
		simon.userTurn = false;
		$('#score').text(simon.curLvl - 1);
	}
});

$('#strict').click(function(){
	simon.strict = !simon.strict;
});

});