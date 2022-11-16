const Elipse = require("./Elipse.js");
const Circulo = require("./Circulo")
const Figura = require("./figura")

var objectA = new Figura(0, 0);
objectA.check(objectA.color);
objectA.pintar();
objectA.esBlanca();


var objectB = new Elipse(3, 4, 1, 5);
objectB.pintar();

var objectC = new Circulo(3, 4, 1);
objectC.pintar();

