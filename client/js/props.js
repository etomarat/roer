/* global $, document, window, _, setInterval */

var props = {};

props.getRandom = function () {
  var count = props.els.size();
  var random = _.random(0, count-1);
  return props.els.eq(random).clone();
};

props.alive = [];

props.spawn = function () {
  var prop = props.getRandom();
  
  var q = (props.container.width()/100)*25;
  var ol = parseInt($('.ship').css('left'));
  
  var minx = ol-q <0 ? ol-q : 0;
  var maxx = ol+$('.ship')+q > props.container.width() ?  ol+$('.ship').width()+q : props.container.width();
  console.log(q, ol, minx, maxx);
  //var x = _.random(0, props.container.width());
  var x = _.random(minx, maxx);
  var y = -prop.height();
  
  prop.css({
    left: x,
    top: y
  });
  
  if (_.random(0, 1) === 1) {
    prop.addClass('mirror');
  }
  
  prop = prop.appendTo(props.container);
  props.alive.push(prop);
  return prop;
};

props.speed = 100;

props.kill = function (prop) {
  props.alive = _.without(props.alive, prop);
  prop.remove();
};

props.killAll = function () {
  props.alive.forEach(function(prop){
    props.kill(prop);
  });
};

props.removeDead = function () {
  props.alive.forEach(function(prop){
    var y = prop.offset().top;
    if (y > props.container.height()) {
      props.kill(prop);
    }
  });
};

props.move = function () {
  props.alive.forEach(function(prop, i){
    var y = parseInt(prop.css('top'));
    prop.css({
      top: y + props.speed
    });
    props.removeDead();
    
  });
};

props.collisions = function() {
  props.alive.forEach(function(prop){
    if(window.isCollides($('.ship'), prop)) {
      //alert('умер'); 
      window.gameOver();
      //props.kill(prop);
      return false;
    }
  });
};

window.startProp = function () {
  props.els = $('.props-storage > *');
  props.container = $('.props');
  props.container.duration = parseInt(props.container.find('img').css('transition-duration'))*1000;
  props.container.start = function() {
    props.container.timerId = setInterval(function () {
      props.spawn();
      props.move();
      score.plus();
    }, props.container.duration);
  };
  props.container.start();
  props.collisionsTimerId = setInterval(function () {
    props.collisions();
  }, 100);
};

$(document).ready(function () {
  
});