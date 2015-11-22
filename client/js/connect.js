/* global $, document, window, WebSocket, _ */

var socket;
var desctop_socket_url = window.socket_url+ 'desktop/';
var left = false;
var right = false;
var gameStart = false;

var playersReady = function(){
  return Boolean(_.indexOf([left, right], false) === -1);
};

var socketOnMessage = function(e) {
  var message = JSON.parse(e.data);
  
  if (message.player === 'left') {
    left = true;
  }
  if (message.player === 'right') {
    right = true;
  }
  
  if (playersReady() && message.type === 'connect') {
    alert('Оба готовы');
    window.showTimer();
    window.timerStep();
    gameStart = true;
  }
  
  window.renderLogged([left, right]);
  
  if (message.type === 'shake') {
    if (gameStart === true) {
      window.moveBoat(message.player);      
    }
  }
  
  console.log(e.data, JSON.parse(e.data));
};

var socketOnMessageInit = function (e) {
  socket.onmessage = socketOnMessage;
  console.log('http://screenshake.xyz/ Номер комнаты: '+e.data);
  $(document).ready(function () {
    window.makeShortUrl('http://'+window.location.host+'/phone/#'+e.data, function(url){
      window.renderPhoneUrl(url);
    });
  });
  //alert('http://screenshake.xyz/ Номер комнаты: '+e.data);
};

var createSocket = function() {
  socket = new WebSocket(desctop_socket_url);
  
  socket.onmessage = socketOnMessageInit;
};

$(document).ready(function(){
  createSocket();
});