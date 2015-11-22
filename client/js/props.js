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
  
  var x = _.random(0, props.container.width());
  var y = -prop.height();
  
  prop.css({
    left: x,
    top: y
  });
  
  prop = prop.appendTo(props.container);
  props.alive.push(prop);
  return prop;
};

props.speed = 100;

props.kill = function (prop) {
  props.alive = _.without(props.alive, prop);
  prop.remove();
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
      props.kill(prop);
      return false;
    }
  });
};

window.startProp = function () {
  props.els = $('.props-storage > *');
  props.container = $('.props');
  props.container.duration = parseInt(props.container.find('img').css('transition-duration'))*1000;
  props.container.timerId = setInterval(function () {
    //props.collisions();
    props.spawn();
    props.move();
    //console.log(props.container.duration);
  }, props.container.duration);
  props.collisionsTimerId = setInterval(function () {
    props.collisions();
  }, 100);
};

$(document).ready(function () {
  window.startProp();
});