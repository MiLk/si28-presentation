$(document).ready(function() {
  var canvas = document.getElementById('canvas');
  if(!canvas) {
    alert("Impossible de récupérer le canvas !");
    return;
  }
  var ctx = canvas.getContext('2d');
  if(!ctx) {
    alert("Impossible de récupérer le contexte du canvas");
    return;
  }
  var game = new Game(ctx);
  game.newWave();
  setTimeout(function(){
    game.update();
  }, 0); 
  $(window).on('keydown', function(e) {
    var which = e.which || e.keyCode;
    switch(which) {
      case 37: // Left
        game.player.move(-1,0);
        break;
      /*case 38: // Top
        game.player.move(0,-1);
        break;*/
      case 39: // Right
        game.player.move(1,0);
        break;
      /*case 40: // Bottom
        game.player.move(0,1);
        break;*/
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
  this.clouds = [];
  this.clouds_step = 0; // When we move the clouds we add 1 to this, when it reaches 50, it's reset to 0 and the clouds go down.
  this.player = new Player(this);
  this.score = 0;
  this.is_stopped = false;
  return this;
};
Game.prototype.update = function() {
  if(this.is_stopped) return;
  var self = this;
  this.render();
  setTimeout(function() {
    self.update();
  }, 40); // 1 frame each 40 ms - 25fps
  // Moving the clouds :
  if(this.clouds_step != ((512+200)/4))
  {
    this.clouds_step++;
    this.clouds.forEach(function(cloud) {
      cloud.move(4,0);
    });
  }
  else
  {
    this.clouds_step = 0;
    this.clouds.forEach(function(cloud) {
      cloud.move(-712,16);
    });
  }
  // Collisions
  this.clouds.forEach(function(cloud) {
    // Beams
    for(var i = 0; i < self.beams.length; i++) {
      if ( (self.beams[i].pos.x >= cloud.pos.x)
        && (self.beams[i].pos.x <= (cloud.pos.x+cloud.width))
        && (self.beams[i].pos.y >= cloud.pos.y)
        && (self.beams[i].pos.y <= (cloud.pos.y+cloud.height)))
      {
        self.removeBeam(self.beams[i]);
        cloud.die();
      }
    }
    // Player
    if ( (self.player.pos.x >= cloud.pos.x)
      && (self.player.pos.x <= (cloud.pos.x+cloud.width))
      && (self.player.pos.y >= cloud.pos.y)
      && (self.player.pos.y <= (cloud.pos.y+cloud.height))) {
      self.stop();
    }
  });
};
Game.prototype.render = function() {
  this.ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height());
  this.player.render();
  this.beams.forEach(function(beam) {
    beam.render();
  });
  this.clouds.forEach(function(cloud) {
    cloud.render();
  });
};
Game.prototype.newWave = function() {
  this.clouds = [];
  this.clouds_step = 0;
  for(var i =0; i < 5; i++) {
    this.clouds.push(new Cloud(this,(i*40)-200,5));
  }
};
Game.prototype.removeBeam = function(beam) {
  var id = this.beams.indexOf(beam);
  this.beams.splice(id,1);
};
Game.prototype.stop = function() {
  this.is_stopped = true;
  this.ctx.font = "20pt sans-serif";
  this.ctx.strokeStyle = "rgb(0,0,0)";
  this.ctx.fillText("Game Over", 200, 250);
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
  /* Image loading for the beam : */
  this.img = new Image();
  this.img.src = './images/rainbow.png';
  this.img.onload = function() {
  };
  this.width = 2;
  this.height = 7;
  
  return this;
};
Beam.prototype.render = function() {
  if(this.pos.y < 0)
  {
    this.game.removeBeam(this);
    return;
  }
  /*this.game.ctx.beginPath();
console.log(this.pos.x, this.pos.y);
  this.game.ctx.moveTo(this.pos.x, this.pos.y);
  this.game.ctx.lineTo(this.pos.x, this.pos.y - 5);
  this.game.ctx.stroke(); */
  this.game.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};

// Cloud object
function Cloud(game, x, y) {
  var self = this;
  this.game = game;
  this.pos = { x: x, y: y };
  
  /* Image loading for the cloud : */
  this.img = new Image();
  this.img.src = './images/cloud.png';
  this.img.onload = function() {
  };
  this.width = 32;
  this.height = 15;
  
  return this;
};
Cloud.prototype.render = function() {
  this.game.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
Cloud.prototype.move = function(x,y) {
  this.pos.x += x ;
  this.pos.y += y ;
};
Cloud.prototype.die = function() {
  var id = this.game.clouds.indexOf(this);
  this.game.clouds.splice(id,1);
  this.game.score += 10;
  $('#score').text(this.game.score);
  if(this.game.clouds.length == 0) this.game.newWave();
};

