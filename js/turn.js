/**
 * Enhancing 'The Sexy Curls JQuery Plugin' by Elliott Kember - http://twitter.com/elliottkember
 * @author - Rajat Mittal http://lifeinafolder.com
 * Released under the MIT license (license.txt)
 * Copyright (c) 2010 ICRL
 * See the file license.txt for copying permission.
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
      side: 'top-left',       // 'top-right','bottom-right','bottom-left'
      turnImage: 'images/fold.png',  // The triangle-shaped fold image
      maxHeight: 300,     // The maximum height to peel.
      startingWidth: 100,   // The height and width
      startingHeight: 100   // with which to start (these should probably be camelCase, d'oh.)
    };

    // Merge options with the defaults
    var options = $.extend(defaults, options);

    // Wrap the target with the necessary DOM structure
    $(this).wrap( '<div id="turn_wrapper">' +
      '<div id="turn_object">' +
      '<div id="turn_hideme">' +
      '</div></div></div>'
    );
    var turn_wrapper = $('#turn_wrapper');
    var turn_object = $('#turn_object');
    turn_object.append('<img id="turn_fold" src="'+ options.turnImage +'"/>');

    // Set starting width and height
    turn_wrapper.css({
      width: options.startingWidth,
      height: options.startingHeight
    });

    //check if peel should stick
    if( options.stick ){
      turn_wrapper.css('position','fixed');
    }

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

    //helper fn to peel out
    function pullOut(){
      turn_wrapper.stop().animate({
        width: options.maxHeight,
        height: options.maxHeight
      });
    }

    //helper fn to peel back
    function pushBack(){
      turn_wrapper.stop().animate({
        width: options.startingWidth,
        height: options.startingHeight
      });
    }

    switch (options.action) {
      case 'click':
        turn_wrapper.toggle(pullOut,pushBack);
        turn_wrapper.css("cursor","pointer");
      break;
      case 'hover':
        turn_wrapper.hover(pullOut,pushBack);
      break;
      default:
        turn_wrapper.resizable({
          maxHeight: options.maxHeight,
          aspectRatio: true,
          handles: handle,
          knobHandles: true,
          dragHandle:false,
          minWidth:options.startingWidth,
          minHeight:options.startingHeight
        });
    }
  };
})(jQuery);
