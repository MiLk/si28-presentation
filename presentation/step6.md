# Step 6: Ajout des projectiles

- setInterval
- Array.push
- Array.splice

```javascript
// Déclaration de la classe Player

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
```

```javascript
Game.prototype.removeBeam = function(beam) {
  var id = this.beams.indexOf(beam);
  this.beams.splice(id,1);
};
```

```javascript
Beam.prototype.render = function() {
  if(this.pos.y < 0)
  {
    this.game.removeBeam(this);
    return;
  }
  this.game.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
```

```javascript
function Game(ctx) {
  this.ctx = ctx;
  this.beams = [];
  this.clouds = [];
  this.clouds_step = 0; // When we move the clouds we add 1 to this, when it reaches 50, it's reset to 0 and the clouds go down.
  this.player = new Player(this);
  return this;
};
```

```javascript
Game.prototype.render = function() {
...
  this.beams.forEach(function(beam) {
    beam.render();
  });
...
};
```

```javascript
Player.prototype.shoot = function() {
  this.game.beams.push(new Beam(this.game, this.pos.x, this.pos.y));
};
```

```javascript
  $(window).on('keydown', function(e) {
    var which = e.which || e.keyCode;
    switch(which) {
      case 37: // Left
        game.player.move(-1,0);
        break;
      case 39: // Right
        game.player.move(1,0);
        break;
      case 32: // Space
        game.player.shoot();
        break;
    };
  });
```

[Retour à l'étape précédente](step5.md) - [Aller à la prochaine étape](step7.md)

