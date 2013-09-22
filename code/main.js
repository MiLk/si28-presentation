$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  if(!canvas) {
    alert("Impossible de récupérer le cancas !");
    return;
  }
  var ctx = canvas.getContext('2d');
  if(!ctx) {
    alert("Impossible de récupérer le contexte du canvas");
    return;
  }
  var game = new Game(ctx);
  setTimeout(function(){
    game.update();
  }, 0); 
  $(window).on('keydown', function(e) {
    var which = e.which || e.keyCode;
    switch(which) {
      case 37: // Left
        game.player.move(-1,0);
        break;
      case 38: // Top
        game.player.move(0,-1);
        break;
      case 39: // Right
        game.player.move(1,0);
        break;
      case 40: // Bottom
        game.player.move(0,1);
        break;
      case 32: // Space
        game.player.shoot();
        break;
    };
  });
});

// Game object
function Game(ctx) {
  this.ctx = ctx;
  this.beams = [];
  this.player = new Player(this);
  return this;
};
Game.prototype.update = function() {
  var self = this;
  this.render();
  setTimeout(function() {
    self.update();
  }, 40); // 1 frame each 40 ms - 25fps
};
Game.prototype.render = function() {
  this.ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height());
  this.player.render();
  this.beams.forEach(function(beam) {
    beam.render();
  });
};

// Player object
function Player(game) {
  var self = this;
  this.game = game;
  this.img = new Image();
  this.img.src = './images/Unicorn.png';
  this.img.onload = function() {
  };
  this.width = 32;
  this.height = 32;
  this.pos = {
    x: ($('#canvas').width() - this.width) / 2,
    y: $('#canvas').height() - this.height
  };
  return this;
};
Player.prototype.render = function() {
  this.game.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
Player.prototype.move = function(x,y) {
  this.pos.x += x * 16;
  this.pos.y += y * 16;
  if(this.pos.x < 0) this.pos.x = 0;
  if(this.pos.y < 0) this.pos.y = 0;
  if(this.pos.x > ($('#canvas').width() - this.width))
    this.pos.x = ($('#canvas').width() - this.width);
  if(this.pos.y > ($('#canvas').height() - this.height))
    this.pos.y = ($('#canvas').height() - this.height);
};
Player.prototype.shoot = function() {
  this.game.beams.push(new Beam(this.game, this.pos.x, this.pos.y));
};

// Beam object
function Beam(game, x, y) {
  var self = this;
  this.game = game;
  this.pos = { x: x, y: y };
  this.interval = setInterval(function() {
    if(self.pos.y < 0) {
      clearInterval(self.interval);
      return;
    }
    self.pos.y -= 10;
  }, 80); 
  return this;
};
Beam.prototype.render = function() {
  if(this.pos.y < 0) return;
  this.game.ctx.beginPath();
console.log(this.pos.x, this.pos.y);
  this.game.ctx.moveTo(this.pos.x, this.pos.y);
  this.game.ctx.lineTo(this.pos.x, this.pos.y - 5);
  this.game.ctx.stroke(); 
};

