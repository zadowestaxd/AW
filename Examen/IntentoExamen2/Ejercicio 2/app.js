"use strict";
const path = require("path");
const express = require("express");
const session = require('express-session');
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

const lista = [];
// Configuración del middleware de sesión
app.use(session({
    secret: 'x23ace', // Cambia esto por una cadena de caracteres aleatoria y segura
    resave: false,
    saveUninitialized: true
}));

//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/cuestionario");

});

app.get("/cuestionario", function (request, response) {

    response.render("cuestionario");

});

app.get("/resultados", function (request, response) {

    response.render("resultados", { lista });

});

app.get("/gracias", checkAdmin, function (req, res) {
    req.session.isAdmin = false;
    res.render("gracias");

});

// Middleware de verificación de administrador
function checkAdmin(req, res, next) {
    // Aquí debes implementar tu lógica de verificación
    // Puedes verificar si el usuario tiene un rol de administrador en tu base de datos o en algún sistema de autenticación
    // Por simplicidad, asumimos que el usuario tiene un atributo 'isAdmin' en su objeto de sesión

    if (req.session && req.session.isAdmin) {
        // El usuario tiene permisos de administrador, permitir el acceso
        next();
    } else {
        // El usuario no tiene permisos de administrador, redirigir a una página de error o a la página de inicio de sesión
        res.redirect('/cuestionario'); // Por ejemplo, redirigir a la página de inicio de sesión
    }
}

app.post("/cuestionario", function (request, response) {
    lista.push({
        edad: request.body.edad,
        canal: request.body.canal,
        residencia: request.body.residencia
    });
    request.session.isAdmin = true;
    response.redirect("/gracias");
});

// Middleware para manejar el error 404
app.use(function (req, res, next) {
    res.status(404).send("Lo siento, la página que estás buscando no se encontró.");
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