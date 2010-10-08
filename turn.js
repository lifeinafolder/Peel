/**
 * The Sexy Curls JQuery Plugin
 * By Elliott Kember - http://twitter.com/elliottkember
 * Released under the MIT license (MIT-LICENSE.txt)
 * 
 * My only request is: please don't over-use this plugin.
 * If this ends up being used all over the internets, and becomes "that annoying effect", I'll be upset.    
 *
 * I dragged a curl, and I liked it - I hope @jeresig don't mind it.
 */

(function($){
  $.fn.fold = function(options) {
    //go away. You dont deserve to use this plugin.
    if ( $.browser.msie && parseInt($.browser.version,10) < 7 ){
      this.remove(); return true;
    }
  
    options = options || {};
    
    // Default awesomeness
    var defaults = {
      directory: '.',         // The directory we're in
      side: 'left',           // change me to "right" if you want rightness
      turnImage: 'fold.png',  // The triangle-shaped fold image
      maxHeight: 400,         // The maximum height. Duh.
      startingWidth: 100,     // The height and width 
      startingHeight: 100,    // with which to start (these should probably be camelCase, d'oh.)
      autoCurl: false         // If this is set to true, the fold will curl/uncurl on mouseover/mouseout.
    };
 
    // Merge options with the defaults
    var options = $.extend(defaults, options);
       
    // Rappin', I'm rappin' - I'm rap-rap-rappin'.
    $(this).wrap( '<div id="turn_wrapper">' +
        '<div id="turn_object">' +
        '<div id="turn_hideme">' +
        '</div></div></div>'
    );
    var turn_wrapper = $('#turn_wrapper');
    var turn_object = $('#turn_object');
    turn_object.append('<img id="turn_fold" src="'+ (options.directory+'/'+options.turnImage) +'"/>');
    
    // Set starting width and height
    turn_wrapper.css({
      width: options.startingWidth, 
      height: options.startingHeight
    });
    
    // There are different CSS classes for different positions
    var handle;
    switch(options.side){
      case 'top-right':
        turn_wrapper.addClass('top-right');
        handle = 'sw';
      break;
      case 'bottom-right':
        turn_wrapper.addClass('bottom-right');
        handle = 'nw';
      break;
      case 'bottom-left':
        turn_wrapper.addClass('bottom-left');
        handle = 'ne';
      break;
      default:
        turn_wrapper.addClass('top-left');
        handle = 'se';
    }
  
    if (!options.autoCurl) {
      // Hit 'em with the drag-stick because it ain't gonna curl itself!
      turn_object.resizable({
        maxHeight: options.maxHeight, 
        aspectRatio: true,
        handles: handle
      });
    } else {  //autocurl true
      turn_wrapper.hover(
        function(){
          turn_object.stop().animate({
            width: options.maxHeight,
            height: options.maxHeight
          });
        },
        function(){
          turn_object.stop().animate({
            width: options.startingHeight,
            height: options.startingHeight
          });
        }
      );
    }
  };
})(jQuery);
