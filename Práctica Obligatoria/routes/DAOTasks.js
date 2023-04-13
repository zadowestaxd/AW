"use strict";

const mysql = require("mysql");

class DAOTasks {
    constructor(pool) {
        this.pool = pool;
    }

    getAllTasks(email) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    console.log(`error: connection to database failed: ${error.message}`);
                    reject(error);
                } else {
                    const sql =
                        "SELECT * FROM UCM_AW_CAU_AVI_Avisos JOIN UCM_AW_CAU_USU_Usuarios ON UCM_AW_CAU_USU_Usuarios.idUser = UCM_AW_CAU_AVI_Avisos.idUser WHERE email = ?";
                    connection.query(sql, [email], (error, resultado) => {
                        connection.release();
                        if (error) {
                            reject(error);
                        } else {
                            let tasks = {};
                            for (let item of resultado) {
                                tasks[item.idAviso] = {
                                    id: item.idAviso,
                                    via: item.via,
                                    tipo: item.tipo,
                                    comentario: item.comentario,
                                    date: item.date,
                                    text: item.texto,
                                    done: item.done,
                                    prioridad: item.prioridad,
                                    idUser: item.idUser,
                                };
                            }
                            resolve(tasks);
                        }
                    });
                }
            });
        });
    }

    insertTask(email, tarea) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    connection.release();
                    console.log(`error: connection to database failed: ${error.message}`);
                    reject(error);
                } else {
                    const sql1 = "SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?";
                    connection.query(sql1, email, (error, result) => {
                        if (error) {
                            connection.release();
                            reject(error);
                        } else {
                            const sql =
                                "INSERT INTO UCM_AW_CAU_AVI_Avisos(idUser, texto, via, tipo, categoria, prioridad, comentario, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                            connection.query(
                                sql,
                                [
                                    result[0].idUser,
                                    tarea.texto,
                                    tarea.via,
                                    tarea.tipo,
                                    tarea.categoria,
                                    tarea.prioridad,
                                    tarea.comentario,
                                    tarea.date,
                                ],
                                (error) => {
                                    connection.release();
                                    if (error) {
                                        reject(error);
                                    } else {
                                        resolve();
                                    }
                                }
                            );
                        }
                    });
                }
            });
        });
    }

    markTaskDone(idTarea) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((error, connection) => {
                if (error) {
                    console.log(`error: connection to database failed: ${error.message}`);
                    reject(error);
                } else {
                    const sql = "UPDATE UCM_AW_CAU_AVI_Avisos SET done = 1 WHERE idAviso = ?";
                    connection.query(sql, [idTarea], (error) => {
                        connection.release();
                        if (error) {
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                }
            });
        });
    }
}

module.exports = DAOTasks;
