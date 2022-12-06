"use strict";

function getToDoTasks(listaTareas) {
    return listaTareas.filter(n => n.done != true).map(n => n["text"]);
};


function findByTag(listaTareas, tag) {
    return listaTareas.filter(n => n.tags.indexOf(tag) != -1);
};

function findByTags(listaTareas, tags) {
    // return listaTareas.filter(n => n.tags.some();
    return listaTareas.filter(n => tags.some(p => n.tags.includes(p)));
};




function countDone(listaTareas) {
    return listaTareas.reduce((hechas, tarea) => {
        if (tarea.done && tarea.done != undefined) {
            hechas++;
        }
        return hechas;
    }, 0);
}


function createTask(texto) {
    const tarea = {};
    const idx = texto.indexOf("@");
    if (idx == -1) {
        tarea.texto = texto;
        return { tarea };
    } else {
        tarea.texto = texto.substring(0, idx).trim();
        tarea.etiquetas = texto.substring(idx).split(" ").map((s) => s.replace("@", ""));
    }

    return { tarea }
}

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

module.exports = {
    getToDoTasks,
    findByTag,
    findByTags,
    countDone,
    createTask,
}

