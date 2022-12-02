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

    getAllTasks(email, callback) {

        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "SELECT tareas.idTarea, tareas.texto, user_tareas.hecho, etiquetas.texto FROM tareas JOIN tareas_etiquetas ON tareas.idTarea = tareas_etiquetas.idTarea JOIN etiquetas ON etiquetas.idEtiqueta = tareas_etiquetas.idEtiqueta JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea JOIN usuarios ON user_tareas.idUser = usuarios.idUser WHERE email = ? ";
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
                                tasks[item.idTarea].tags[cont] = item.texto;
                            }
                            else {
                                cont++;
                                tasks[item.idTarea].tags[cont] = item.texto;
                            }

                        }
                        callback(null, tasks);
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
                const sql = `INSERT INTO tareas(texto) VALUES("${tarea.tarea.texto}")`;
                connection.query(sql, tarea.tarea.texto, function (error) {

                    if (error) {
                        connection.release();
                        console.log(error);
                        callback(error);
                        return;
                    }
                    const sql1 = `SELECT idTarea FROM tareas WHERE texto = ?`;
                    connection.query(sql1, tarea.tarea.texto, function (error, result) {
                        if (error) {
                            connection.release();
                            callback(error);
                            return;
                        }
                        let idTarea = result[0].idTarea;
                        if (tarea.tarea.etiquetas != undefined) {
                            generateSQLColumns(tarea.tarea.etiquetas, tarea.tarea.etiquetas).forEach(element => {
                                const sql1 = `INSERT INTO etiquetas (texto) VALUES ("${element}")`;
                                connection.query(sql1, element, function (error, result) {
                                    if (error) {
                                        connection.release();
                                        callback(error);
                                        return;
                                    }
                                    const sql1 = `SELECT idEtiqueta FROM etiquetas WHERE texto = "${element}"`;
                                    connection.query(sql1, tarea.tarea.texto, function (error, result) {
                                        let idEtiqueta = result[0].idEtiqueta;
                                        if (error) {
                                            connection.release();
                                            callback(error);
                                            return;
                                        }
                                        const sql3 = `INSERT INTO tareas_etiquetas (idTarea, idEtiqueta) VALUES (?, ?)`;
                                        connection.query(sql3, [idTarea, idEtiqueta], function (error) {
                                            if (error) {
                                                connection.release();
                                                callback(error);
                                                return;
                                            }
                                            const sql4 = `SELECT usuarios.idUser FROM usuarios WHERE usuarios.email = ?`;
                                            connection.query(sql4, email, function (error, userID) {
                                                if (error) {
                                                    connection.release();
                                                    callback(error);
                                                    return;
                                                }
                                                const sql5 = `INSERT INTO user_tareas (idTarea, idUser) VALUES (${idTarea},${userID[0].idUser})`;
                                                connection.query(sql5, [idTarea, userID[0].idUser], function (error) {
                                                    callback(error);
                                                    return;
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        }
                        else {
                            const sql4 = `SELECT usuarios.idUser FROM usuarios WHERE usuarios.email = ?`;
                            connection.query(sql4, email, function (error, userID) {
                                if (error) {
                                    connection.release();
                                    callback(error);
                                    return;
                                }

                                const sql5 = `INSERT INTO user_tareas (idTarea, idUser) VALUES (${idTarea},${userID[0].idUser})`;

                                connection.query(sql5, [idTarea, userID[0].idUser], function (error) {
                                    callback(error);
                                    return;
                                });
                            });
                        }
                    });

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
        console.log(email)
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const auxsql = "SELECT tareas.idTarea FROM tareas JOIN user_tareas ON tareas.idTarea = user_tareas.idTarea JOIN usuarios ON user_tareas.idUser = usuarios.idUser WHERE usuarios.email = ? AND hecho = 1";
                connection.query(auxsql, [email], function (error, rows) { // [{"idTarea": 9}]
                    if (error) {
                        connection.release();

                        return callback(error);
                    }
                    if (rows.length == 0) {
                        return callback();
                    }
                    const ids = rows.map((tarea) => tarea.idTarea);
                    const intermdiasql = `DELETE FROM tareas_etiquetas WHERE ${generateWhereIdTarea(ids)};`;
                    connection.query(intermdiasql, ids, function (error) {
                        if (error) {
                            connection.release();
                            callback(error);
                            return;
                        }
                        const usertareasql = `DELETE FROM user_tareas WHERE ${generateWhereIdTarea(ids)}`;

                        connection.query(usertareasql, ids, function (error) {
                            if (error) {
                                connection.release();
                                callback(error);
                                return;
                            }
                            const finalsql = `DELETE FROM tareas WHERE ${generateWhereIdTarea(ids)}`;
                            connection.query(finalsql, ids, function (error) {
                                connection.release();
                                callback(error);

                            });
                        });
                    });
                });
            }
        });
    }
}

module.exports = DAOTasks;

