// app.js
const config = require("./routes/config");
const DAOTasks = require("./routes/DAOTasks");
const DAOUsers = require("./routes/DAOUsers");
const utils = require("./routes/utils");
const path = require("path");
const mysql = require("mysql");
const express = require("express");
const fs = require("fs");

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

app.use(express.urlencoded({ extended: false }));
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
    response.status(200);
    response.render("/tasks");
});
/*aqui iria primero el login del usuario y de lograrse
se recogerian todos sus avisos para mostrarlos, si no 
nos mantendremos en LogIn/SingUp*/
app.get("/tasks", function (request, response) {
    daoT.getAllTasks("usuario@ucm.es", function (err, result) {
        if (err) {
            console.log("Error en leer avisos");
        } else {
            response.render("tasks", { tasks: result });
            console.log("Exito en leer avisos");
        }
    });

});

app.post("/addTask", function (request, response) {
    let task = utils.createTask(request.body.text);

    daoT.insertTask("usuario@ucm.es", task, function (err) {
        if (err) {
            console.log("Error en insertar tarea");
        } else {
            console.log("Exito en insertar tarea");
            response.redirect("/tasks");
        }
    });
});

app.get("/finish/:id", function (request, response) {
    daoT.markTaskDone(request.params.id, function (err) {
        if (err) {
            console.log("Error en finalizar tarea");
        } else {
            response.redirect("/tasks");
            console.log("Exito en finalizar tarea");
        }
    });
});

app.get("/deleteCompleted", function (request, response) {
    daoT.deleteCompleted("usuario@ucm.es", function (err) {
        if (err) {
            console.log("Error al eliminar tareas");
        } else {
            response.redirect("/tasks");
            console.log("Exito al eliminar tareas");
        }
    });
});

app.listen(config.port, function (err) {
    if (err) {
        console.log("ERROR al iniciar el servidor");
    }
    else {
        console.log(`Servidor arrancado en el puerto ${config.port}`);
    }
});