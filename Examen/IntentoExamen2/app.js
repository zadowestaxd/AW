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

app.get("/login", function (request, response) {

    response.render("login", { errorMessage: null });

});


//Coge los datos pasados por el formulario del login
app.post("/login", function (request, response) {
    console.log(request.body);

    const user = usuarios.find(user => user.user == request.body.user && user.pass == request.body.pass);
    if (user) {
        response.redirect("/cambio")
    } else {
        response.render("login", { errorMessage: "El usuario o contraseña son incorrectos" });
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