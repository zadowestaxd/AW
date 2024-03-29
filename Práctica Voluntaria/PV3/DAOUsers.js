"use strict"

const mysql = require("mysql");

class DAOUsers {
    constructor(pool) {
        this.pool = pool;
    }

    isUserCorrect(email, password, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(new Error("Error de conexión a la base de datos"));
            } else {
                const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
                connection.query(sql, [email, password], function (error, result) {
                    connection.release();
                    if (error) {
                        callback(new Error("Error de acceso a la base de datos"));
                    } else {
                        if (rows.length === 0) {
                            callback(null, false); //no está el usuario con el password proporcionado
                        } else
                            callback(null, result);
                    }
                });
            }
        });
    }

    getUserImageName(email, callback) {
        this.pool.getConnection(function (error, connection) {
            if (error) {
                callback(error);
                console.log(`error al obtener la conexión: ${error.message}`);
            } else {
                const sql = "SELECT img FROM user WHERE email = ?";
                connection.query(sql, [email], function (error, result) {
                    connection.release();
                    if (error) {
                        callback(error);
                    } else {
                        if (result.length > 0) {
                            callback(null, result);
                        } else {
                            callback();
                        }
                    }
                });
            }
        });
    }
}


module.exports = DAOUsers;