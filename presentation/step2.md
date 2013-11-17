# Step 2 : Création de la classe Game

- Création d'une classe
- nettoyage de l'écran
- setTimeout
- boucle principale

```javascript
// Récupération du contexte du canvas

// Game object
function Game(ctx) {
  this.ctx = ctx;
  return this;
};
Game.prototype.update = function() {
  this.render();
  setTimeout(function() {
    self.update();
  }, 40); // 1 frame each 40 ms - 25fps
};
Game.prototype.render = function() {
  this.ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height());
};
```

```javascript
// Récupération du contexte du canvas

var game = new Game(ctx);
setTimeout(function(){
  game.update();
}, 0);

// Déclaration de le classe Game
```

