
$( document ).ready(function() {

var start = Date.now();
var timerOn = false;
var sessionLength = 1500;
var breakLength = 300;
var sessionRunning = true; // false denotes Break is running
var runner = null; // model
var audioElement = document.createElement('audio');

audioElement.setAttribute('src', '../sound/Ship_Bell.mp3');

function init() {
  if(sessionRunning) {
    tout = sessionLength;
  }
  else {
    tout = breakLength;
  }
  temp = tout;
  refreshView(formatTime(temp), "0%");
}

init();

// logic
$("#toggle").click(function() {
  if(!timerOn) {
    start = Date.now();
    timerOn = true;
    runner = setInterval(function(){
      temp = tout - Math.round((Date.now() - start)/1000);
      if( temp < 1 ) {
        audioElement.play();
        sessionRunning = !sessionRunning;
        init();
        start = Date.now();
      }
    }, 200);
   } else {
    timerOn = false;
    tout = tout - Math.round((Date.now() - start)/1000);
    clearInterval(runner);
  }
});

// controllers
$("#moreSess").click(function() {
  sessionLength += 60;
  stopUpdate(runner);
});

$("#lessSess").click(function() {
  if ( sessionLength > 60 ) {
    sessionLength -= 60;
    stopUpdate(runner);
  }
});

$("#moreBreak").click(function() {
  breakLength += 60;
  stopUpdate(runner);
});

$("#lessBreak").click(function() {
  if ( breakLength > 60 ) {
    breakLength -= 60;
    stopUpdate(runner);
  }
});

function formatTime(time) {
  var seconds = time % 60;
  return ( seconds > 9 )? parseInt(time/60) + " : " + seconds : parseInt(time/60) + " : " + "0" + seconds;
}

function stopUpdate(runner) {
  if(runner) {
    timerOn = false;
    clearInterval(runner);
  }
  init();
}

function getfill(temp) {
  if (sessionRunning){
    return 100 - Math.round(temp*100/sessionLength) + "%";
  } else {
    return 100 - Math.round(temp*100/breakLength) + "%";
  }
}

function refreshView(timeSec, fill) {
  $("#time").text(timeSec);
  $("#mode").text( sessionRunning ? "Session" : "Break" );
  $("#sess").text(sessionLength/60);
  $("#break").text(breakLength/60);
  $("#fill").css("height", fill);  
}

// view
var timeSec = temp;
var fill =  getfill(temp);
var viewer = setInterval(function(){
    if(temp !== timeSec) {
      timeSec = temp;
      fill =  getfill(temp);
      refreshView(formatTime(timeSec), fill);
    }
  }, 100);

});

