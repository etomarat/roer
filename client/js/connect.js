/* global $, document, window, WebSocket, _ */

var socket;
var desctop_socket_url = window.socket_url+ 'desktop/';
var left, right = false;
var players = [left, right];

var playersReady = function(){
  return Boolean(_.indexOf(players, false) === -1);
};

var socketOnMessage = function(e) {
  var message = JSON.parse(e.data);
  
  if (message.player == 'left') {
    left = true;
  }
  if (message.player == 'right') {
    right = true;
  }
  
  if (playersReady()) {
    alert('Оба готовы');
    window.showTimer();
    window.timerStep();
  }
  
  window.renderLogged(players);
  
  console.log(e.data, JSON.parse(e.data));
};

var socketOnMessageInit = function (e) {
  socket.onmessage = socketOnMessage;
  console.log('http://screenshake.xyz/ Номер комнаты: '+e.data);
};

var createSocket = function() {
  socket = new WebSocket(desctop_socket_url);
  
  socket.onmessage = socketOnMessageInit;
};

$(document).ready(function(){
  createSocket();
});