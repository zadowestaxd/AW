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

const list = []

//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/login");

});

app.get("/login", function (request, response) {

    response.render("login");

});

app.get("/resultados", function (request, response) {
    //matriz[0][0] = 0;
    response.render("resultados", { resultados: list });

});

app.get("/gracias", function (request, response) {

    response.render("gracias");

});


//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    console.log(request.body);
    list.push({
        edad: request.body.edad,
        canal: request.body.canal,
        residencia: request.body.residencia
    })
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