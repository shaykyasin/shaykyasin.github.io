$(document).ready(function(){
// =============================================================
// Changing navbar background color of navbar when scrolled
    $(window).scroll(function() {
        if (document.documentElement.clientWidth >= 768){
            if ($(document).scrollTop() > 200) {
                $(".navbar-default").css("background-color", "rgba(0, 0, 0, 0.8)");
            } else {
                $(".navbar-default").css("background-color", "transparent");
            }
        }
    });
    $(window).resize(function(){
        if (document.documentElement.clientWidth < 768) {
            $(".navbar-default").css("background-color", "rgba(0, 0, 0, 0.8)");
        } else {
            $(".navbar-default").css("background-color", "transparent");
        }
    });

    $('[data-toggle="tooltip"]').tooltip();

// =============================================================
//Smooth Scroll:
  $('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 800);
        return false;
      }
    }
  });

});


// =============================================================
// Changing heading height when orientation changed
function doOnOrientationChange()
{
    switch(window.orientation)
    {
        case -90:
        case 90:
            $(".header").css("min-height", "180%"); // landscape mode
            break;
        default:
            $(".header").css("min-height", "100%"); // portrait mode
            break;
    }
}
window.addEventListener('orientationchange', doOnOrientationChange);
// Initial execution if needed
doOnOrientationChange();


// =============================================================
// jQuery for fittext
/*global jQuery */
/*!
* FitText.js 1.2
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license
* http://sam.zoy.org/wtfpl/
*
* Date: Thu May 05 14:23:00 2011 -0600
*/

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );


jQuery(".responsive_h1").fitText(2, { minFontSize: '32px', maxFontSize: '65px' });
jQuery(".responsive_p").fitText(2, { minFontSize: '16px', maxFontSize: '20px' });
