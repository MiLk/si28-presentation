# Step 4 : déplacement du Player

- Gestion des events avec jQuery

```javascript
// Définition de la classe Player

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
```

```javascript
// Instanciation de la classe Game et création de la boucle

  $(window).on('keydown', function(e) {
    var which = e.which || e.keyCode;
    switch(which) {
      case 37: // Left
        game.player.move(-1,0);
        break;
      case 39: // Right
        game.player.move(1,0);
        break;
    };
  });

// Définition de la classe Game
```

