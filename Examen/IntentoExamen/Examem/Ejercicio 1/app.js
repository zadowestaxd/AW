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


var usuarios = [
    {
        nombre: "Aitor", apellidos: "Tilla Patata", user: "aitor01", pass:
            "ATP01"
    },
    {
        nombre: "Carmelo", apellidos: "Cotón Partido", user: "carmelo02", pass:
            "CCP02"
    },
    {
        nombre: "Mirella", apellidos: "Baila Sola", user: "mirella03", pass:
            "MBS03"
    },
    {
        nombre: "Felipe", apellidos: "Lotas Blandas", user: "felipe04", pass:
            "FLB04"
    }
]


//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/login");

});
//Gestiona el enlace cuando entras en http://localhost:3000/login
app.get("/login", function (request, response) {

    response.render("login", { error: false });

});
//Gestiona el enlace cuando entras en http://localhost:3000/cambio
app.get("/cambio", function (request, response) {

    response.render("cambio");

});

// Middleware para manejar el error 404
app.use(function (req, res, next) {
    res.status(404).send("Lo siento, la página que estás buscando no se encontró.");
});

// Middleware para manejar errores
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send("Oops! Algo salió mal en el servidor.");
});

//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    var con = false;
    var v = 0;
    while (v < usuarios.length && con == false) {
        if (usuarios[v].user == request.body.name && usuarios[v].pass == request.body.password) {
            con = true;
            v--;
        }
        v++;
    }
    if (con == true) {
        response.redirect("/cambio");
    } else {
        response.render("login", { error: true });
    }
});
//Coge los datos nuevos al cambiar de contraseña y hace las pertinentes comprobaciones 
app.post("/cambio", function (request, response) {
    var v = 0;
    var con = false;
    while (v < usuarios.length && con == false) {
        if (usuarios[v].user == request.body.name) {
            con = true;
            v--;
        }
        v++;
    }
    if (con == true && request.body.oldPassword == usuarios[v].pass && usuarios[v].pass != request.body.password) {
        var cont = 0;
        var n = 0;
        while (n < request.body.password.length) {
            if (request.body.password.charAt(n) == request.body.password.charAt(n).toUpperCase()) {
                cont++;
            }
            n++;
        }
        if (request.body.password.length > 5 && cont > 2) {
            usuarios[v].pass = request.body.password;
            response.render("cambio");
            console.log('Contraseña cambiada exitosamente');
        }
        else {
            console.log("fallos en la seguridad de la contraseña");
            response.render("cambio");
        }
    }
    else {
        console.log("security alert");
        response.render("cambio");
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