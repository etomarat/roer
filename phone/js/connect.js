/* global $, document, window, WebSocket, _, navigator */
/*jshint multistr: true */

var socket;
var phone_socket_url = window.socket_url + window.playerSide + '/';

var socketOnOpen = function() {

  if (window.DeviceMotionEvent) {
    window.addEventListener("devicemotion", accelerometerUpdate, true);
  }

  function accelerometerUpdate(e) {
    var OS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? -1 : 1 );
    var aGX = e.accelerationIncludingGravity.x*OS;
    var aGY = e.accelerationIncludingGravity.y*OS;
    var aGZ = e.accelerationIncludingGravity.z*OS;
    //The following two lines are just to calculate a
    // tilt. Not really needed.
    var xGPosition = Math.atan2(aGY, aGZ);
    var yGPosition = Math.atan2(aGX, aGZ);

    $('body .info').html('\
      aX:'+aGX+'<br>\
      aY:'+aGY+'<br>\
      aZ:'+aGZ+'<br>\
      xPosition:'+xGPosition+'<br>\
      yPosition:'+yGPosition+'<br>\
    ');

    var data = {
      aGX: parseFloat(aGX.toFixed(3)),
      aGY: parseFloat(aGY.toFixed(3)),
      player: window.playerSide
    };

    socket.send(JSON.stringify(data));
  }
  
  var iOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
  console.log(iOS, 'iOS');
};

var socketOnClose = function(event) {
  if (event.wasClean) {
    alert('Соединение закрыто чисто');
  } else {
//    alert('Обрыв соединения. Код: ' + event.code); // например, "убит" процесс сервера
  }
//  window.location.reload();
};

var createSocket = function() {
  socket = new WebSocket(phone_socket_url);
  
  socket.onclose = socketOnClose;
  socket.onopen = socketOnOpen;
};

$(document).ready(function(){
  createSocket();
});
