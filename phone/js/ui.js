/* global $, document, window, socket, setTimeout */

window.getRoomId = function(){
  return window.location.hash.replace("#","");
};

$(document).on('ready', function(){
  $('.player').on('click', function(){
    $(this).addClass('logged');
    $(this).siblings().fadeOut();
    $(this).parent().parent().find('h1').fadeOut();
    
    window.playerSide = $(this).attr('data-player');
    var roomId = window.getRoomId();
    window.createSocket(roomId);
    
    socket.send(JSON.stringify({
      type: 'connect',
      player: window.playerSide,
    }));
  });
});