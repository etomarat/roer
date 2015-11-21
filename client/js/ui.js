/* global $, document, window, WebSocket, _, setTimeout */

window.renderLogged = function(players){
  players.forEach(function(v, i){
    if (v) {
      $('.popup .players-row > *').eq(i).removeClass('logged');
    }
  });
};

window.showTimer = function() {
  $('.popup .timer').removeClass('hidden');
};

window.hidePopup = function() {
  $('.popup').hide();
};

window.timerStep = function() {
  setTimeout(function(){
    var cur_time = parseInt($('.popup .timer .seconds').text());
    if (cur_time!==0) {
      cur_time--;
      window.timerStep();
    } else {
      alert('time is out');
      window.hidePopup();
    }
    $('.popup .timer .seconds').text('0'+cur_time);
  }, 1000);
};

$(document).ready(function(){
  
});
