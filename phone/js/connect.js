/* global $, document, window, WebSocket, _, navigator */
/*jshint multistr: true */

var socket;

var socketOnOpen = function() {
  
  var shakeEvent = new Shake({
    threshold: 15,
    timeout: 200
  });
  
  shakeEvent.start();
  
  window.addEventListener('shake', function(){
    sendOneShake();
  }, false);
  
  var sendOneShake = function() {
    socket.send(JSON.stringify({
      type: 'shake',
      player: window.playerSide,
      shake: 1
    }));
  };
  
};

var socketOnClose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
    console.log('Обрыв соединения. Код: ' + event.code); // например, "убит" процесс сервера
  }
//  window.location.reload();
};

window.createSocket = function(roomId) {
  var phone_socket_url = window.socket_url + window.playerSide + '/' + roomId + '/';
  
  socket = new WebSocket(phone_socket_url);  
  socket.onclose = socketOnClose;
  socket.onopen = socketOnOpen;
};

$(document).ready(function(){
  //createSocket();
});
