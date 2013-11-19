# Intro

## Javascript

- Language qui permet de réaliser des choses dynamiques dans le navigateur.
- Essentiellement utilisé pour manipuler l'arbre DOM.
- Avec HTML5, beacoup de nouvelles possiblités sont offertes.

```html
<p>
Click here!
</p>
```
```javascript
var p = document.getElementsByTagName("p");
p[0].onclick = function(e) {
  this.innerHTML = 'Hello World!';
};
```

## jQuery

jQuery est une bibliothèque qui permet de simplifier l'écriture du JavaScript.
Elle comporte notamment des fonctions pour manipuler l'arbre DOM, gérer les événements et modifier les feuilles de styles CSS.

Pour pouvoir l'utiliser, il suffit d'insérer un fichier javascript sur sa page avec le code suivant:
```html
<script type="text/javascript" src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
```

Avant d'utiliser les fonctions de jQuery, il faut exécuter le code suivant,
qui s'assure que l'ensemble de la page est prête, avant de pouvoir lier des événements aux différents éléments.
```javascript
$(document).ready(function() {
  // Votre code
});
```

Par exemple, pour réagir au clic sur un élément et modifier le texte à l'intérieur, on utilise le code suivant.
```html
<p>
Click here!
</p>
```
```javascript
$(document).ready(function() {
  $('p').on('click', function() {
    $(this).text('Hello world!'):
  });
});
```

## canvas

Il permet de dessiner des images ou des formes (rectangles, arcs de cercle, ...) directemment dans la page web.

- liste de quelques fonctions:
  - clearRect()
  - fillRect()
  - strokeRect()
  - beginPath()
  - fill()
  - stoke()
  - fillText()
  - strokeText()
  - drawImage()
  - moveTo()
  - lineTo()


## POO en JS

La programmation orientée objet permet de réaliser des applications avec un raisonnement proche de ce qu'il se passe dans la réalité.
Chaque objet représente un concept, une idée ou une entité physique.
Les objets peuvent vivre d'eux-même ou bien communiquer avec les autres objets.

Un objet est une structure de données qui contient des attributs et des fonctions.
Une classe permet de définir la structure de chaque objet, et un objet est une instance de classe.

Le code suivant définit une classe `Foo` avec un attribut `attr` et une méthode `bar`.
Il instancie ensuite un objet `foo` et utilise la méthode `bar`.
```javascript
function Foo() {
  this.attr = null;
}
Foo.prototype.bar = function() {
  console.log('Hello World!');
}
var foo = new Foo();
foo.bar();
```

[Aller à la prochaine étape](step0.md)

