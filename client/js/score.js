
var score = {
  new: 0,
  render: function () {
   $('.hud .score .number').text(score.new);
  },
  plus: function () {
    score.new++;
    score.render();
  },
  isNewHiscore: function () {
    if (score.new > score.hiScore()) {
      localStorage.setItem('hiscore', score.new);
      return true;
    }
    return false;
  },
  hiScore: function () {
    return parseInt(localStorage.getItem('hiscore') || 0);
  }
};

