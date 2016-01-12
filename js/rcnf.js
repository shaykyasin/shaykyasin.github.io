$( document ).ready(function() {
  newJoke();
  
  function newJoke(){
    var rnum = Math.ceil(Math.random()*549);
    var url = "http://api.icndb.com/jokes/" + rnum;
    var twUrl = '';
    
    $.getJSON(url, function (json) {
      $('.joke').html(json.value.joke);
      twUrl = "https://twitter.com/intent/tweet?text="+json.value.joke;
      $('a').attr('href', twUrl);
    });

    $(".btn").blur();
  };
  
  $("#another").click(function(){
    newJoke();
  });

});

/* Credits 
http://www.icndb.com/api/
https://dev.twitter.com/web/tweet-button
http://slicejack.com/creating-a-fullscreen-html5-video-background-with-css/
*/