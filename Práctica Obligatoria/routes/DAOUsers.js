"use strict"

const mysql = require("mysql");


class DAOUsers {
    constructor(pool) {
        this.pool = pool;
    }
    getAthenticatedUser(email, password, callback) {

        this.pool.getConnection(function (error, connection) {
            if (error) {
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql = `SELECT UCM_AW_CAU_USU_Usuarios.idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ${email} AND password = ${password}`;
                connection.query(sql, [email, password], function (err, resultado) {
                    connection.release();
                    if (err) {
                        return callback(err);
                    } else {
                        callback(null, resultado);
                    }
                });
            }
        });
    }

    insertUser(email, password, callback) {
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
                    else if (result.lenght == 0) {
                        const sql = `INSERT INTO UCM_AW_CAU_USU_Usuarios(email, password) VALUES("${email}","${password}")`;
                        connection.query(sql, [email, password], function (error) {
                            if (error) {
                                connection.release();
                                console.log(error);
                                return callback(error);
                            }
                            else return callback();
                        });

                    }
                    else {
                        console.log("usuario preexistente");
                        return callback();
                    }
                });
            }
        });
    }
}

module.exports = DAOUsers;