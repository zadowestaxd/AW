"use strict";

const mysql = require("mysql");
const config = require("./config");
const DAOUsers = require("./DAOUsers");
const DAOTasks = require("./DAOTasks");

// Crear el pool de conexiones
const pool = mysql.createPool({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});

let daoUser = new DAOUsers(pool);
let daoTask = new DAOTasks(pool);

// Definición de las funciones callback
// Uso de los métodos de las clases DAOUsers y DAOTasks

daoUser.isUserCorrect("klk@gmail.com", 1111, function (error, existe) {
    if (error) {
        console.log(error.message);
    } else if (result) {
        console.log("Usuario y contraseña correctos");
    } else {
        console.log("Usuario y/o contraseña incorrectos");
    }
});

daoUser.getUserImageName("amigo@email.com", function (error, str) {
    if (error) {
        console.log("error al obtener la imagen.");
    } else {
        console.log(str);
    }
});

daoTask.getAllTasks("vecondios@email.com", function (error, str) {
    if (error) {
        console.log("error al obtener todas las tareas.");
    } else {
        console.log(str);
    }
});

let task = {
    "text": "PEPE",
    "done": 0,
    "tags": ["uno", "dos"]
};

daoTask.insertTask("klk@gmail.com", task, function (error) {
    if (error) {
        console.log("error al insertar la nueva tarea.");
    } else {
        console.log("Insercion completada.");
    }
});

daoTask.markTaskDone(2, function (error) {
    if (error) {
        console.log("error al marcar tarea como completada.");
    } else {
        console.log("Tarea completada.");
    }
});

daoTask.deleteCompleted("klk@gmail.com", function (error) {
    if (error) {
        console.log("error al borrar las tareas completadas.");
    } else {
        console.log("Borrado completado.");
    }
});