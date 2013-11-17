# step 5 : Ajout des ennemis

Nous allons maintenant ajouter des ennemis à notre jeu.
Nous allons créer des nuages qui se déplacent de gauche à droite sur la même ligne.
Une fois arrivés au bout de la ligne, la ligne va se rapprocher.
Au bout d'un certain temps les nuages arriveront donc au contact du joueur.

On va créer la classe `Cloud` de la même façon que `Player` précédemment.
```javascript
// Définition de la classe Player

function Cloud(game, x, y) {
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
```

Il faut ajouter deux nouvelles variables à la classe `Game`, une première pour stocker l'ensemble des nuages, et une seconde pour savoir sur quelle ligne se déplacent les nuages.
```javascript
function Game(ctx) {
  this.ctx = ctx;
  this.clouds = [];
  this.clouds_step = 0; // When we move the clouds we add 1 to this, when it reaches 50, it's reset to 0 and the clouds go down.
  this.player = new Player(this);
  return this;
};
```

Il faut aussi créer une fonction pour ajouter des nouveaux nuages dans le jeu.
```javascript
Game.prototype.newWave = function() {
  this.clouds = [];
  this.clouds_step = 0;
  // On crée 5 nuages
  for(var i =0; i < 5; i++) {
    this.clouds.push(new Cloud(this,(i*40)-200,5));
  }
};
```

On modifie la fonction `render` de `Game` pour dessiner les nuages.
```javascript
Game.prototype.render = function() {
  this.ctx.clearRect(0,0,$('#canvas').width(),$('#canvas').height());
  this.player.render();
  this.clouds.forEach(function(cloud) {
    cloud.render();
  });
};
```

Il faut aussi modifier la fonction `update` de `Game` pour déplacer les nuages.
```javascript
Game.prototype.update = function() {
...
  // taille du canvas + longueur des nuages ou démarrage
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
};
```

On va maintenant créer une nouvelle vague d'ennemis dans la fonction principale.
```javascript
var game = new Game(ctx);
game.newWave();
setTimeout(function(){
  game.update();
}, 0); 
```

