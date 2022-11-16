"use strict";

class Figura {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.color = new String("000000");
        this.check(this.color);
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


module.exports = Figura;