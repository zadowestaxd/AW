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

//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/login");

});

app.get("/login", function (request, response) {

    response.render("login");

});

//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    console.log(request.body);
    if (request.body.edad == "<20") {

    } else if (request.body.edad == "20 a 30") {

    } else if (request.body.edad == ">40") {

    }

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