"use strict";
const path = require("path");
const express = require("express");
const { stringify } = require("querystring");
const { render } = require("ejs");
const { redirect } = require("express/lib/response");
const { error } = require("console");
const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

const matriz = [[0, 0, 0, 0], [0, 0, 0, 0][0, 0, 0, 0]];

//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/login");

});

app.get("/login", function (request, response) {

    response.render("login");

});

app.get("/resultados", function (request, response) {
    //matriz[0][0] = 0;
    response.render("resultados", { matriz: matriz });

});

app.get("/gracias", function (request, response) {

    response.render("gracias");

});


//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    console.log(request.body);
    if (request.body.edad == "menor que 20") {
        matriz[0][0]++;
    } else if (request.body.edad == "20 a 30") {
        matriz[0][1]++;
    } else if (request.body.edad == "30 a 40") {
        matriz[0][2]++;
    } else if (request.body.edad == "mayor de 40") {
        matriz[0][3]++;
    }

    if (request.body.canal == "Buscador de internet") {
        matriz[1][1]++;
    }
    else if (request.body.edad == "Comunidad de Madrid") {
        matriz[1][1]++;
    } else if (request.body.edad == "resto del territorio") {
        matriz[1][2]++;
    } else if (request.body.edad == "fuera de España") {
        matriz[1][3]++;
    }
    response.redirect("/gracias");
});



//conecta con el servidor
app.listen(3000, function (error) {
    if (error) {
        console.log("error, no se detecta el servidor" + stringify.JSON(error));
    }
    else {
        console.log("servidor arrancado en el puerto: 3000");
    }
});