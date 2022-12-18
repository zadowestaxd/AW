"use strict"

const mysql = require("mysql");


class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }
    getAllTasks(email, callback) {

        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                return callback(error);
            } else {
                const sql = "SELECT * FROM UCM_AW_CAU_AVI_Avisos JOIN UCM_AW_CAU_USU_Usuarios ON UCM_AW_CAU_USU_Usuarios.idUser = UCM_AW_CAU_AVI_Avisos.idUser WHERE email = ? ";
                connection.query(sql, [email], function (err, resultado) {
                    connection.release();
                    if (err) {
                        return callback(err, null);
                    } else {
                        let tasks = [];
                        for (let item of resultado) {
                            tasks[item.idAviso] = {
                                id: item.idAviso,
                                text: item.texto,
                                done: item.done,
                                prioridad: item.prioridad,
                                idUser: item.idUser
                            };

                        }
                        return callback(null, tasks);
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
                const sql1 = "SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?"
                connection.query(sql1, email, function (error, result) {
                    console.log(result);
                    if (error) {
                        connection.release();
                        console.log(error);
                        return callback(error);
                    }
                    else {
                        const sql = `INSERT INTO UCM_AW_CAU_AVI_Avisos(idUser,texto) VALUES("${result[0].idUser}","${tarea.tarea.texto}")`;
                        connection.query(sql, [result[0].idUser, tarea.tarea.texto], function (error) {
                            if (error) {
                                connection.release();
                                console.log(error);
                                return callback(error);
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
                const sql = "UPDATE UCM_AW_CAU_AVI_Avisos SET done = 1 WHERE tareas.idTarea = ?";
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
                const sql1 = "SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?"
                connection.query(sql1, email, function (error, result) {
                    console.log(result);
                    if (error) {
                        connection.release();
                        console.log(error);
                        return callback(error);
                    }
                    const auxsql = "SELECT UCM_AW_CAU_AVI_Avisos.idTarea FROM UCM_AW_CAU_AVI_Avisos WHERE idUser = ? AND done = 1";
                    connection.query(auxsql, result[0].idUser, function (error, rows) { // [{"idTarea": 9}]
                        if (error) {
                            connection.release();

                            return callback(error);
                        }
                        if (rows.length == 0) {
                            return callback();
                        }
                        const ids = rows.map((tarea) => tarea.idTarea);
                        const intermdiasql = `DELETE FROM UCM_AW_CAU_AVI_Avisos WHERE ${generateWhereIdTarea(ids)};`;
                        connection.query(intermdiasql, ids, function (error) {
                            if (error) {
                                connection.release();
                                callback(error);
                                return;
                            }
                        });
                    });
                });
            }
        });
    }
}

module.exports = DAOTasks;

