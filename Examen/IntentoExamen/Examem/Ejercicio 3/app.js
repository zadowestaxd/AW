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

const json = {
    descripcion: 'Productos',
    items: [
        { nombre: 'taza de Star Wars', precio: 300, imagen: 'taza-de-star-wars.jpg' },
        { nombre: 'FIFA 22 PS4', precio: 100, imagen: 'fifa22_PS4.jpg' },
        { nombre: 'Camiseta Marbel', precio: 100, imagen: 'camiseta-marvel.jpg' },
        { nombre: 'Figura Funco Stranger', precio: 200, imagen: 'funco-lucas-stranger.jpg' },
        {
            nombre: 'Botella Marvel', precio: 120, imagen: 'botella-marvel.jpg'
        },
        { nombre: 'Llavero Star-Wars', precio: 120, imagen: 'llavero-star-wars.jpg' },
    ]
}

//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {
    response.redirect("/ofertas");

});


//Gestiona el enlace cuando entras en http://localhost:3000/login
app.get("/ofertas", function (request, response) {

    response.render("ofertas", json);
});

app.listen(3000, function (error) {

    if (error) {
        console.log("error, no se detecta el servidor" + stringify.JSON(error));
    }
    else {
        console.log("servidor arrancado en el puerto: 3000");
    }
});