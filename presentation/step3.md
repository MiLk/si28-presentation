# Step 3 : Ajout du Player

Dans cette partie, nous allons créer la classe `Player`.
Nous verrons comment dessiner une image dans notre canvas.

```javascript
// Déclaration de la classe Game

// Player object
function Player(game) {
  this.game = game;
  // On charge une image
  this.img = new Image();
  this.img.src = './images/Unicorn.png';
  this.img.onload = function() {
  };
  // On spécifie la taille de notre personnage
  this.width = 32;
  this.height = 32;
  // On centre le personnage en bas et au centre de l'écran
  this.pos = {
    x: ($('#canvas').width() - this.width) / 2,
    y: $('#canvas').height() - this.height
  };
  return this;
};
Player.prototype.render = function() {
  // On dessine le personnage à l'écran
  this.game.ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
};
```

On va maintenant modifier la classe Game pour y intégrer le personnage.
```javascript
function Game(ctx) {
  this.ctx = ctx;
  this.player = new Player(this);
  return this;
};
Game.prototype.render = function() {
  this.ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height());
  this.player.render();
});
```

[Retour à l'étape précédente](step2.md) - [Aller à la prochaine étape](step4.md)

