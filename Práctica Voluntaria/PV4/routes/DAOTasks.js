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
                const sql = "SELECT tareas.texto, etiquetas.texto FROM tareas JOIN tareas_etiquetas ON tareas.idTarea = tareas_etiquetas.idTarea JOIN etiquetas ON etiquetas.idEtiqueta = tareas_etiquetas.idEtiqueta JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea JOIN usuarios ON user_tareas.idUser = usuarios.idUser WHERE email = ? ";
                connection.query(sql, [email], function (error, aux) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        const array = [];
                        const etiquetas = [];

                        aux.forEach(element => {
                            etiquetas.push(element.etiqueta);
                        });

                        array.push({
                            "id": aux[0].id,
                            "text": aux[0].text,
                            "done": aux[0].done,
                            "etiquetas": etiquetas,
                        });

                        callback(null, array);
                    }
                });
            }
        });
    }

    insertTask(email, tarea, callback) {
        this.pool.getConnection(function (error, connection) {

            if (error) {
                connection.release();
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "INSERT INTO tareas(text) VALUES(?)";
                connection.query(sql, [tarea.text], function (error, resultado) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        const values = [];
                        tarea.etiquetas.forEach(e => {
                            values.push(resultado.insertId, e);
                        });
                        const sql1 = `INSERT INTO etiquetas (idEtiqueta, texto) VALUES ${generateSQLColumns(values, tarea.etiquetas)}`;
                        connection.query(sql1, values, function (error) {
                            connection.release();
                            if (error) {
                                callback(error);
                            } else {
                                callback();
                            }
                        });
                        const sql2 = `INSERT INTO tareas_etiquetas (idEtiqueta, idTarea) VALUES (?, ?)`;
                        connection.query(sql2, [tarea.etiqueta.idEtiqueta, tarea.idTarea], function (error) {
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
        });
    }

    markTaskDone(idTarea, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "UPDATE tarea SET done = 1 WHERE id = ?";
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
                const sql = "DELETE FROM tareas JOIN user_tareas ON idTarea = idTarea JOIN usuarios ON idUser = idUser WHERE email = ? AND done = 1;";
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

