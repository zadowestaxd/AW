// app.js
const config = require("./routes/config");
const DAOTasks = require("./routes/DAOTasks");
const { DAOUsers } = require("./routes/DAOUsers");
const utils = require("./routes/utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const fs = require("fs");
const { stringify } = require("querystring");
const { render } = require("ejs");
const { request } = require("http");
const eSession = require("express-session");
const esqlSession = require("express-mysql-session")
const sqlConfig = config.mysqlConfig;
const MySQLStore = esqlSession(eSession);

const sessionStore = new MySQLStore({

    host: sqlConfig.host,

    user: sqlConfig.user,

    password: sqlConfig.password,

    database: sqlConfig.database

});

// Crear un servidor Express.js
const app = express();

// Crear un pool de conexiones a la base de datos de MySQL
const pool = mysql.createPool(config.mysqlConfig);

// Crear una instancia de DAOTasks
const daoT = new DAOTasks(pool);

// Crear una instancia de DAOUsers
const daoU = new DAOUsers(pool);

// Configurar ejs como motor de plantillas
app.set("view engine", "ejs");


// Definir el directorio de plantillas
app.set("views", path.join(__dirname, "views"));

const middlewareSession = eSession({

    saveUninitialized: false,

    resave: true,

    secret: "secretito",

    store: sessionStore

});

app.use(middlewareSession)

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

/*
let listaTareas = [
    { text: "Preparar práctica AW", tags: ["AW", "practica"] },
    { text: "Mirar fechas congreso", done: true, tags: [] },
    { text: "Ir al supermercado", tags: ["personal"] },
    { text: "Mudanza", done: false, tags: ["personal"] },
];
*/

app.get("/", function (request, response) {

    response.redirect("/logIn");

});
/*aqui iria primero el login del usuario y de lograrse
se recogerian todos sus avisos para mostrarlos, si no 
nos mantendremos en LogIn/SingUp*/
app.get("/tasks", function (request, response) {
    daoT.getAllTasks("usuario@ucm.es", function (err, result) {
        if (err) {
            console.log("Error en leer avisos", err);
        } else {
            response.render("tasks", { tasks: result });
            console.log("Exito en leer avisos");
        }
    });

});

app.get("/logIn", (req, res) => {
    res.render("logIn");

});



app.post("/logOn", (req, res) => {
    daoU.getAthenticatedUser(req.body.usr, req.body.pwd, (data) => {
        if (data[0]) {
            req.session.current = data[0].email;
            req.session.tipo = data[0].perfil;
            res.redirect("/tasks");

        }
        else {
            res.render("logIn");
        }
    });
});

app.get("/signUp", (req, res) => {
    res.render("signUp");

});

app.get("/logOut", (req, res) => {
    req.session.destroy();
    res.redirect("/logIn");

});
app.post("/register", (req, res) => {
    daoU.insertUser(req.body, (data) => {
        if (data.insertId) {
            console.log("tu usrId es " + data.insertId);
            res.redirect("/logIn");
        }
        else
            res.render("signUp");
    });
});

app.post("/searchTask", (req, res) => {

});

app.post("/searchUser", (req, res) => {

});

app.post("/addTask", function (request, response) {
    let task = utils.createTask(request.body.text);

    daoT.insertTask("usuario@ucm.es", task, function (err) {
        if (err) {
            console.log("Error en insertar tarea", err);
        } else {
            console.log("Exito en insertar tarea");
            response.redirect("/tasks");
        }
    });
});

app.get("/finish/:id", function (request, response) {
    const id = request.params.id;
    daoT.markTaskDone(id, function (err) {
        if (err) {
            console.log("Error en finalizar tarea", err);
        } else {
            response.redirect("/tasks");
            console.log("Exito en finalizar tarea");
        }
    });
});

app.get("/deleteCompleted", function (request, response) {
    daoT.deleteCompleted("usuario@ucm.es", function (err) {
        if (err) {
            console.log("Error al eliminar tareas", err);
        } else {
            response.redirect("/tasks");
            console.log("Exito al eliminar tareas");
        }
    });
});

app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor", err);
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});