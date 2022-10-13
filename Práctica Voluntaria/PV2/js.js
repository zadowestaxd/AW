// planets.js
// ----------

// Primer ejemplo de código en Javascript

"use strict";


/*class tarea {
    text;
    done;
    tags;
};*/

/*
let planetas = [
    "Mercurio", "Venus", "Tierra",
    "Marte", "Júpiter", "Saturno",
    "Urano", "Neptuno"
];

planetas.forEach(p => {
    console.log(`¡Hola, ${p}!`);
});*/

let cosas = [
    "universidad", "basico"
]
let listaTareas = [
    { text: "Preparar practicas AW", tags: ["universidad", "awt"] }
    , { text: "Mirar fechas congreso", done: true, tags: [] }
    , { text: "Ir al supermercado", tags: ["personal", "basico"] }
    , { text: "Jugar al futbol", done: false, tags: ["personal", "deportes"] }
    , { text: "Hablar con profesor", done: false, tags: ["universidad", "tp2"] }
];
function getToDoTasks(listaTareas) {
    return listaTareas.filter(n => n.done != true).map(n => n["text"]);
};

console.log(getToDoTasks(listaTareas));

function findByTag(listaTareas, tag) {
    return listaTareas.filter(n => n.tags.indexOf(tag) != -1);
};

console.log(findByTag(listaTareas, "awt"));

function findByTags(listaTareas, tags) {
    // return listaTareas.filter(n => n.tags.some();
    return listaTareas.filter(n => tags.some(p => n.tags.includes(p)));
}

console.log(findByTags(listaTareas, cosas));