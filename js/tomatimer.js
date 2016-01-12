
$( document ).ready(function() {

var start = Date.now()
  , running = false
  , pomo = 1500
  , doro = 300
  , pm = true
  , runner = null
  , audioElement = document.createElement('audio');

  audioElement.setAttribute('src', '../sound/Ship_Bell.mp3');

  function init() {
  if(pm) {
    tout = pomo;
  }
  else {
    tout = doro;
  }
  temp = tout;
}

init();

$("#toggle").click(function() {
  if(!running) {
    start = Date.now();
    running = true;
    runner = setInterval(function(){
      temp = tout - Math.round((Date.now() - start)/1000);
      if( temp < 1 ) {
        audioElement.play();
        pm = !pm;
        init();
        start = Date.now();
      }
    }, 200);
   } else {
    running = false;
    tout = tout - Math.round((Date.now() - start)/1000);
    clearInterval(runner);
  }
});

$("#moreSess").click(function() {
  pomo += 60;
  stopUpdate(runner);
});

$("#lessSess").click(function() {
  if ( pomo > 60 ) {
    pomo -= 60;
    stopUpdate(runner);
  }
});

$("#moreBreak").click(function() {
  doro += 60;
  stopUpdate(runner);
});

$("#lessBreak").click(function() {
  if ( doro > 60 ) {
    doro -= 60;
    stopUpdate(runner);
  }
});

function formatTime(time) {
  var seconds = time % 60;
  return ( seconds > 9 )? parseInt(time/60) + " : " + seconds : parseInt(time/60) + " : " + "0" + seconds;
}

function stopUpdate(runner) {
  if(runner) {
    running = false;
    clearInterval(runner);
  }
  init();
}

function getfill(temp) {
  if (pm){
    return 100 - Math.round(temp*100/pomo) + "%";
  } else {
    return 100 - Math.round(temp*100/doro);
  }
}

var viewer = setInterval(function(){
  var fill =  getfill(temp);
    $("#mode").text( pm ? "Session" : "Break" );
    $("#time").text(formatTime(temp));
    $("#sess").text(pomo/60);
    $("#break").text(doro/60);
    $("#fill").css("height", fill);
  }, 100);

});

