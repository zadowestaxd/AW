"use strict";

const Elipse = require("./Elipse.js");

class Circulo extends Elipse {
    constructor(x, y, r) {
        super(x, y, r, r);
    }

}

module.exports = Circulo;
