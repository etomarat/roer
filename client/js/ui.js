/* global $,  document, window, WebSocket, _, setTimeout */

var shouter;

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
  $('.popup').remove();
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
      var mainTheme = $('.main-theme')[0];
      mainTheme.play();    
    }
    $('.popup .timer .seconds').text('0'+cur_time);
    $('.wavesHolder').remove();
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
  
  helmRotation = helmRotation+(offset);
  $('.helm').css({
    transform: 'rotate(' + helmRotation + 'deg)'
  });
  
};

window.renderPhoneUrl = function(shortUrl, longUrl){
  $('.popup .short-link').text(shortUrl);
  $('.popup .long-link').text(longUrl);
};

$(document).ready(function () {
  $('.play').on('click', function(e) {
    e.preventDefault();
    $('.shalom').remove();
    $('.popup').show();
  });
  
  $('.wavesHolder').height($(document).height());
  
  var waveGenerator = function ($holder) {
    var wavesCounter = Math.round($holder.height() / 80 * 2)+1;
    var wavePosition = -40;
    for(var i = 0; i < wavesCounter; i++) {
      $('<div class="wave"></div>').appendTo($holder).css({
        top: wavePosition,
        'z-index': i,
      });
      wavePosition = wavePosition + 40;
    }
  };
  
  waveGenerator($('.screen'));
  waveGenerator($('.wavesHolder'));
  
  for (var i=1; i<9; i++) {
    console.log(i);
    $('<audio class="shout"><source src="sound/shout'+i+'.mp3" type="audio/mpeg"></audio>').prependTo($('body'));
  }
  
  shouter = function () {
    var r=Math.round(Math.random()*9);
    $('.shout')[r].currentTime = 0;
    $('.shout')[r].play();
  };
  
  setTimeout(function () {
    shouter();    
  }, 300);
});