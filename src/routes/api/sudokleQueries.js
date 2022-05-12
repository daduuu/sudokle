"use strict";

const boom = require("@hapi/boom");
const utils = require("./utils");
const sql = require("mysql");
const config = require("../../config");

module.exports.register = async server => {

    const sqlQueries = await utils.loadSqlQueries("sudokleQueries");


    server.route({

        method: "GET",
        path: "/api/sudokleQueries",

        handler: function (request, h) {

            try {
                const connection = sql.createConnection({
                    host: config.sql.server,
                    port: config.sql.port,
                    user: config.sql.user,
                    password: config.sql.password,
                    database: config.sql.user
                });

                connection.on('error', function (err) {
                    console.log(err);
                });


                return new Promise((resolve, reject) => {
                    connection.query(sqlQueries.getTextBoxes, function (error, results, fields) {
                        if (error) {
                            return reject(error)
                        }

                        console.log(results);

                        return resolve(results);
                    });
                    connection.end();

                });

            } catch (err) {
                console.log(err);
            }

        }

    });

    server.route({
        method: "POST",
        path: "/api/sudokleQueries",

        handler: function (request, h) {
            try {
                const connection = sql.createConnection({
                    host: config.sql.server,
                    port: config.sql.port,
                    user: config.sql.user,
                    password: config.sql.password,
                    database: config.sql.user
                });

                connection.on('error', function (err) {
                    console.log(err);
                });
                console.log(request.payload);

            } catch (err) {
                server.log(err);
                return boom.boomify(err);
            }

        }
    });
}
