"use strict"

const mysql = require("mysql");



class DAOUsers {
    constructor(pool) {
        this.pool = pool;
    }

    getAthenticatedUser(email, password, callback) {
        this.pool.getConnection(function (err, con) {
            if (err) {
                con.release();
                console.error(`error: conexion con base de datos fallida:`);
                return callback();
            } else {
                const sql = `SELECT * FROM UCM_AW_CAU_USU_Usuarios WHERE email = '${email}' AND password = '${password}'`;
                con.query(sql, [email, password], function (err, res) {
                    con.release();
                    return callback(res);
                });
            }
        });
    }

    insertUser(user, callback) {
        this.pool.getConnection(function (error, connection) {

            if (error) {
                connection.release();
                console.log(`error: conexion con base de datos fallida: ${error.message}`);
                callback(error);
            } else {
                const sql1 = "SELECT idUser FROM UCM_AW_CAU_USU_Usuarios WHERE email = ?"
                connection.query(sql1, user.mail, function (error, result) {
                    if (error) {
                        connection.release();
                        console.log(error);
                        return callback(error);
                    }
                    else if (!result[0]) {
                        const sql = `INSERT INTO UCM_AW_CAU_USU_Usuarios(email, password, name, numEmpleado, perfil) VALUES('${user.mail}','${user.pwd}','${user.usr}','${user.numero}','${user.tipo}')`;
                        connection.query(sql, user, function (error, res) {
                            if (error) {
                                connection.release();
                                console.log(error);
                                return callback();
                            }
                            else return callback(res);
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

module.exports = { DAOUsers };