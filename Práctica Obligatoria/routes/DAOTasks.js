"use strict"

const mysql = require("mysql");

function generateSQLColumns(values, entities) {
    if (values.length == 0) return "";
    const cols = values.length / entities.length;
    const rows = entities.length;
    const aux = [];
    for (let i = 0; i < rows; i++) {
        aux.push(entities[i]);


    }
    return aux;
}

function generateWhereIdTarea(idTareaList) {
    let arr = [];
    idTareaList.forEach(() => {
        arr.push("idTarea = ?");
    });
    return arr.join(" OR ");
}
/*if (!error) {
    error = undefined;
    error = null;
    error = 0;
    error = "";
    error = false;
}*/
class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }


}

module.exports = DAOTasks;

