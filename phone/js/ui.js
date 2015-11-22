/* global $, document, window, socket */

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
    
    alert(socket);
    alert(window.playerSide);
    socket.send(JSON.stringify({
      type: 'connect',
      player: window.playerSide,
    }));
  });
});