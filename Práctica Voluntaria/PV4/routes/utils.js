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
    let tarea = texto.match(/@\w*/g)
    if (tarea != undefined && tarea.length != 0) {
        tarea = tarea.map(e => e.substring(1));
    }
    texto = texto.replace(/@\w*/g, "").trim();

    return { texto, tarea }
}

module.exports = {
    getToDoTasks,
    findByTag,
    findByTags,
    countDone,
    createTask,
}