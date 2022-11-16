class Figura {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = new String("#000000");
    }
    pintar() {
        console.log("Nos movemos a la posicion (" + this.x + ". " + this.y + ")");
        console.log("cogemos la pintura de color " + this.color);
        return true;
    }

    check(params) {
        return /^[0-9A-F]+$/ig.test(params.slice(1));
    }


    esBlanca() {
        if (this.color.toUpperCase() == "#FFFFFFF") {
            return true;
        }
        else {
            return false;
        }
    }

}

var objectA = new Figura(0, 0);
objectA.pintar();
objectA.esBlanca();

class Elipse extends Figura {
    constructor(x, y, rh, rv) {
        super(x, y);
        this.rh = rh;
        this.rv = rv;
    }
    pintar() {
        super.pintar();
        console.log("Pintamos elipse de " + this.rh + " y " + this.rv);
    }
}

var objectB = new Elipse(3, 4, 1, 5);
objectB.pintar();

class Circulo extends Elipse {
    constructor(x, y, r) {
        super(x, y, r, r);
    }

}

var objectC = new Circulo(3, 4, 1);
objectC.pintar();
