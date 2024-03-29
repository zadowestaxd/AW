
//---Función getToDoTasks(tasks)
//Esta función devuelve un array con los textos de aquellas tareas de la lista de tareas tasks que no estén finalizadas.
getToDoTasks = tasks => {
    return tasks.filter(e => e.done !== true).map(e => e["text"]);
}


//---Función findByTag(tasks, tag)
//Esta función devuelve un array que contiene las tareas del array tasks que contengan, en su lista de etiquetas, la etiqueta
//pasada como segundo parámetro.
findByTag = (task, tag) => {
    return task.filter(e => e.tags.indexOf(tag) != -1);
}


//---Función findByTags(tasks, tags)
//Esta función devuelve un array que contiene aquellas tareas del array tasks que contengan al menos una etiqueta que coincida 
//con una de las del array tags pasado como segundo parámetro.
findByTags = (task, tags) => {
    return task.filter(e => tags.some(e1 => e.tags.includes(e1)));
}


//---Función countDone(tasks)
//Esta función devuelve el número de tareas completadas en el array de tareas tasks pasado como parámetro.
countDone = tasks => {
    return tasks.reduce((total, actual) => {
        if (actual.done != undefined && actual.done) {
            total++;
        }
        return total;
    }, 0);
}


//---Función createTask(texto)
//Esta función recibe un texto intercalado con etiquetas, cada una de ellas formada por una serie de caracteres
//alfanuméricos precedidos por el signo @. Esta función debe devolver un objeto tarea con su array de etiquetas 
//extraídas de la cadena texto. Por otra parte, el atributo text de la tarea resultante no debe contener las etiquetas 
//de la cadena de entrada ni espacios en blanco de más.
createTask = text => {
    let tags = text.match(/@\w*/g)
    if (tags != undefined && tags.length != 0) {
        tags = tags.map(e => e.substring(1));
    }
    text = text.replace(/@\w*/g, "").trim();

    return { text, tags, done: false }
}

module.exports = {
    getToDoTasks,
    findByTag,
    findByTags,
    countDone,
    createTask,
}