# Step 1 : Récupération du canvas

Afin de pouvoir dessiner sur notre page, il va nous falloir créer un canvas et le récupérer son contexte dans le JavaScript pour pouvoir l'utiliser.

```javascript
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
```

