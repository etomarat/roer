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
      window.hidePopup();
      window.startProp();
    }
    $('.popup .timer .seconds').text('0'+cur_time);
  }, 1000);
};

function collision () {
  clearInterval(boatCollisionTimer);
  alert('Колизия');
}

window.collisionDetection = function () {
  var boat = {};
  boat.el = $('.ship');
  boat.x = boat.el.position().left;
  boat.y = boat.el.position().top;
  boat.w = boat.el.width();
  boat.h = boat.el.height();
  
  var shipZone = {};
  shipZone.el = $('.ship-zone');
  shipZone.w = shipZone.el.width();
  if (boat.x < 0) {
    collision();
  }
  if (boat.x+boat.w > shipZone.w) {
    collision();
  }
};

var boatCollisionTimer = setInterval(function(){
  window.collisionDetection();
}, 300);

var helmRotation = 0;

window.moveBoat = function(direction) {
  var velocity = 50;
  var offset = (direction === 'left') ? -1 : 1;
  
  var curOffset = parseInt($('.ship').css('left'));
  $('.ship').css('left', curOffset+(offset*velocity)+'px');
  
  window.collisionDetection();
  
  helmRotation = helmRotation+(offset*1.4);
  $('.helm').css({
    transform: 'rotate(' + helmRotation + 'deg)'
  });
  
};

window.renderPhoneUrl = function(shortUrl){
  $('.popup .short-link').text(shortUrl);
};

$(document).ready(function () {
  $('.popup').show();
  
  $('.play').on('click', function(e) {
    e.preventDefault();
    $('.shalom').fadeOut();
    $('.popup').show();
  });
  
  var wavesCounter = Math.round($('.screen').height() / 80 * 2);
  var startWavesGenerator = function () {
    
    var wavePosition = 688;
    var waveIndex = wavesCounter;
    for(var i = 0; i < wavesCounter; i++) {
      $('.screen').append('<div style="top:' + wavePosition + 'px; z-index: ' + waveIndex + ';" class="wave"></div>');
      wavePosition = wavePosition - 40;
      waveIndex = waveIndex - 1;
    }
  };
  startWavesGenerator();
  
  function shouter() {
    var a=Math.round(Math.random()*9);
    var play = [
          'sound/shout1.mp3',
          'sound/shout2.mp3',
          'sound/shout3.mp3',
          'sound/shout4.mp3',
          'sound/shout5.mp3',
          'sound/shout6.mp3',
          'sound/shout7.mp3',
          'sound/shout8.mp3',
          'sound/shout9.mp3',
        ];
    $('<audio autoplay><source src="'+play[a]+'" type="audio/mpeg"></audio>').prependTo($('body'));
  }
  shouter();
});