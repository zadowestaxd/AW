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
                const sql = "SELECT * FROM task JOIN tag ON taskId = id WHERE user = ? ";
                connection.query(sql, [email], function (error, aux) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        const array = [];
                        const tags = [];

                        aux.forEach(element => {
                            tags.push(element.tag);
                        });

                        array.push({
                            "id": aux[0].id,
                            "text": aux[0].text,
                            "done": aux[0].done,
                            "tags": tags,
                        });

                        callback(null, array);
                    }
                });
            }
        });
    }

    insertTask(email, task, callback) {
        this.pool.getConnection(function (error, connection) {

            if (error) {
                connection.release();
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "INSERT INTO task(user, text, done) VALUES(?, ?, ?)";
                connection.query(sql, [email, task.text, task.done], function (error, resultado) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        const values = [];
                        task.tags.forEach(e => {
                            values.push(resultado.insertId, e);
                        });
                        const sql1 = `INSERT INTO tag (taskId, tag) VALUES ${generateSQLColumns(values, task.tags)}`;
                        connection.query(sql1, values, function (error) {
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

    markTaskDone(idTask, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = "UPDATE task SET done = 1 WHERE id = ?";
                connection.query(sql, [idTask], function (error) {
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
                const sql = "DELETE FROM task WHERE user = ? AND done = 1;";
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

