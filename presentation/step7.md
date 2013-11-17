# Step 7 : collision

- logique de collision (projectile et joueurs > points, nuages > carrés)
- Mise à jour du score
- Arrêt du jeu

Il faut faire en sorte que lorsqu'un laser touche un nuage, le laser et le nuage soient supprimés.
Il faut aussi faire en sorte que lorsqu'un nuage touche le joueur, la partie s'arrête.
```javascript
Game.prototype.update = function() {
...
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
```

Lorsqu'un nuage meurt, il faut le supprimer et mette à jour le score.
S'il n'y a plus de nuages, il faut relancer une vague.
```javascript
Cloud.prototype.die = function() {
  var id = this.game.clouds.indexOf(this);
  this.game.clouds.splice(id,1);
  this.game.score += 10;
  $('#score').text(this.game.score);
  if(this.game.clouds.length == 0) this.game.newWave();
};
```

Lorsque le jeu s'arrête, il faut afficher un message sur l'écran.
```javascript
Game.prototype.stop = function() {
  this.is_stopped = true;
  this.ctx.font = "20pt sans-serif";
  this.ctx.strokeStyle = "rgb(0,0,0)";
  this.ctx.fillText("Game Over", 200, 250);
};
```

Il faut modifier la classe `Game` pour initialiser le score à 0, et indiquer que le jeu n'est pas stoppé au démarrage.
```javascript
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
```

Il faut modifier la fonction `update` de façon à stopper la boucle, si le jeu est arrété.
```javascript
Game.prototype.update = function() {
  if(this.is_stopped) return;
...
});
```

[Retour à l'étape précédente](step6.md)

