"use strict"

const mysql = require("mysql");

function generateSQLColumns(values, entities) {
    if (values.length == 0) return "";
    const cols = values.length / entities.length;
    const rows = entities.length;
    const arr = [];
    for (let i = 0; i < rows; i++) {
        let aux = [];
        for (let j = 0; j < cols; j++) {
            aux.push("?");
        }
        arr.push("(" + aux.join(",") + ")")
    }
    return arr.join(",");
}

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email, callback) {

        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "SELECT tareas.idTarea, tareas.texto, user_tareas.hecho, etiquetas.tag FROM tareas JOIN tareas_etiquetas ON tareas.idTarea = tareas_etiquetas.idTarea JOIN etiquetas ON etiquetas.idEtiqueta = tareas_etiquetas.idEtiqueta JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea JOIN usuarios ON user_tareas.idUser = usuarios.idUser WHERE email = ? ";
                connection.query(sql, [email], function (err, resultado) {
                    connection.release();
                    if (err) {
                        callback(err, null);
                    } else {
                        let tasks = [];
                        let cont;
                        for (let item of resultado) {
                            if (!tasks[item.idTarea]) {
                                cont = 0;
                                tasks[item.idTarea] = {
                                    id: item.idTarea,
                                    text: item.texto,
                                    done: item.hecho,
                                    tags: []
                                };
                                tasks[item.idTarea].tags[cont] = item.tag;
                            }
                            else {
                                cont++;
                                tasks[item.idTarea].tags[cont] = item.tag;
                            }

                        }
                        callback(null, tasks);
                    }
                });
            }
        });
    }

    createTask(texto) {
        let tarea = texto.match(/@\w*/g)
        if (tarea != undefined && tarea.length != 0) {
            tarea = tarea.map(e => e.substring(1));
        }
        texto = texto.replace(/@\w*/g, "").trim();

        return { texto, tarea }
    }


    insertTask(email, tarea, callback) {
        this.pool.getConnection(function (error, connection) {

            if (error) {
                connection.release();
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "INSERT INTO tareas(texto) VALUES(?)";
                connection.query(sql, [tarea.texto], function (error) {
                    connection.release();
                    if (error) {
                        console.log("1");
                        callback(error);
                    } else {

                        const sql = "SELECT idTarea FORM tareas WHERE texto = ?";
                        connection.query(sql, [tarea.texto], function (error, result) {
                            connection.release();
                            if (error) {
                                console.log("2");
                                callback(error);
                            }
                            const sql1 = `INSERT INTO etiquetas (texto) VALUES (${generateSQLColumns(values, tarea.etiquetas)})`;
                            connection.query(sql1, values, function (error) {
                                connection.release();
                                if (error) {
                                    console.log("3");
                                    callback(error);
                                } else {
                                    callback();
                                }
                            });
                            const sql = "SELECT idEtiqueta FORM etiquetas WHERE texto = ?";
                            connection.query(sql, [tarea.texto], function (error, resultSet) {
                                connection.release();
                                if (error) {
                                    console.log("4");
                                    callback(error);
                                }
                                const sql2 = `INSERT INTO tareas_etiquetas (idEtiqueta, idTarea) VALUES (?, ?)`;
                                connection.query(sql2, [result, resultSet], function (error) {
                                    connection.release();
                                    if (error) {
                                        callback(error);
                                        console.log("5");
                                    } else {
                                        callback();
                                    }
                                });
                            });
                        });
                    }
                });
            }
        });
    }

    markTaskDone(idTarea, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "UPDATE tareas JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea SET user_tareas.hecho = 1 WHERE tareas.idTarea = ?";
                connection.query(sql, [idTarea], function (error) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        callback();
                    }
                });
            }
        });
    }

    deleteCompleted(email, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "DELETE tareas FROM tareas JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea JOIN usuarios ON user_tareas.idUser = usuarios.idUser WHERE email = ? AND hecho = 1; ";
                connection.query(sql, [email], function (error) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        callback();
                    }
                });
            }
        });
    }
}

module.exports = DAOTasks;

