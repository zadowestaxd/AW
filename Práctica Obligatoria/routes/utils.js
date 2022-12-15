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

/*login()
        .then((data) => {
            console.log();
            res.json(data);
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(400);
        });
*/

/*<script>
        $(function () {
            // Cada vez que se pulse el botón de 'Enviar'
            $("#botonEnviar").on("click", function () {
                // Obtener el valor contenido en el cuadro de texto

                //let email = $("#cuadroTexto").val();
                //let pwd = $("#password").val();
                // Realizar la petición al servidor
                let user = $("#username").val();
                let password = $("#password").val();

                console.log(user);
                console.log(password);

                const data = $.param({
                    usr: user,
                    pwd: password
                })

                console.log(data)

                $.ajax({
                    method: "POST",
                    url: "/logOn",
                    data: data,
                    // En caso de éxito, mostrar el resultado en el documento HTML
                    success: function (data, textStatus, jqXHR) {
                        $("#resultado").text("El resultado es " + data.resultado);
                    },
                    // En caso de error, mostrar el error producido
                    error: function (jqXHR, textStatus, errorThrown) {
                        alert("Se ha producido un error: " + errorThrown);
                    }
                });
            });


        });
    </script>
*/
module.exports = {
    getToDoTasks,
    findByTag,
    findByTags,
    countDone,
    createTask,
}

