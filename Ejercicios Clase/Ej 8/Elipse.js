"use strict";

const Figura = require("./figura.js");


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

module.exports = Elipse;
