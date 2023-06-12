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

var user;

// Configuración del middleware de sesión
app.use(session({
    secret: 'x23ace', // Cambia esto por una cadena de caracteres aleatoria y segura
    resave: false,
    saveUninitialized: true
}));



//Gestiona el enlace cuando entras en http://localhost:3000
app.get("/", function (request, response) {

    response.redirect("/login");

});

app.get("/login", function (request, response) {

    response.render("login", { errorMessage: null });

});

app.get("/cambio", checkAdmin, function (req, res) {

    res.render("cambio", { errorMessage: null });

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
        res.redirect('/login'); // Por ejemplo, redirigir a la página de inicio de sesión
    }
}

app.post("/cambio", function (request, response) {
    console.log(request.body);
    //Las dos introducciones de clave deben ser iguales, la longitud se estima que debería 
    //ser mayor de 5 caracteres y debe contener 3 mayúsculas y 2 dígitos.
    if (request.body.newpass == request.body.newpass1 && request.body.newpass.length > 5) {
        usuarios.at(user).pass = request.body.newpass;
        req.session.isAdmin = false;
        response.redirect("/login");
    } else {
        response.render("cambio", { errorMessage: "Error al cambiar la contraseña" });
    }
});

//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    console.log(request.body);

    user = usuarios.find(user => user.user == request.body.user && user.pass == request.body.pass);
    if (user) {
        request.session.isAdmin = true;
        response.redirect("/cambio")
    } else {
        response.render("login", { errorMessage: "El usuario o contraseña son incorrectos" });
    }
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


//conecta con el servidor
app.listen(3000, function (error) {
    if (error) {
        console.log("error, no se detecta el servidor" + stringify.JSON(error));
    }
    else {
        console.log("servidor arrancado en el puerto: 3000");
    }
});