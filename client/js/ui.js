/* global $,  document, window, WebSocket, _, setTimeout */

window.renderLogged = function(players){
  players.forEach(function(v, i){
    if (v) {
      $('.popup .players-row > *').eq(i).addClass('logged');
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

window.moveBoat = function(direction) {
  var velocity = 1;
  var offset = (direction === 'left') ? -1 : 1;
  
  var curOffset = parseInt($('.ship').css('left'));
  
  console.log(offset, curOffset, ((curOffset-offset)*velocity)+'px');
  $('.ship').css('left', ((curOffset-offset)*velocity)+'px');
};

$(document).ready(function () {
  $('.popup').show();
  
  var wavesCounter = Math.round($('.screen').height() / 80 * 2);
  var startWavesGenerator = function () {
    
    var wavePosition = 688;
    var waveIndex = wavesCounter;
    for(i = 0; i < wavesCounter; i++) {
      $('.screen').append('<div style="top:' + wavePosition + 'px; z-index: ' + waveIndex + ';" class="wave"></div>');
      wavePosition = wavePosition - 40;
      waveIndex = waveIndex - 1;
    }  
  };
  startWavesGenerator();
});