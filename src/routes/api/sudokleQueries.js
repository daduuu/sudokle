"use strict";

const boom = require("@hapi/boom");
const utils = require("./utils");
const sql = require("mysql");
const config = require("../../config");

module.exports.register = async server => {

    const sqlQueries = await utils.loadSqlQueries("sudokleQueries");



    server.route({

        method: "GET",
        path: "/api/sudokleQueries/getLeaderboardInfo",

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
                    connection.query(sqlQueries.getLeaderboardInfo, function (error, results, fields) {
                        if (error) {
                            console.log(error);
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

        method: "GET",
        path: "/api/sudokleQueries/getDailySudokuGrid",

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
                    connection.query(sqlQueries.getDailySudokuGrid, function (error, results, fields) {
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
        path: "/api/sudokleQueries/addUser",

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

                const {userEmail, dailyPuzzleSolved, dailyPuzzleTimedSolved, puzzlesSolved, averageTimeSolvedWeek} = request.payload;

                return new Promise((resolve, reject) => {
                    connection.query(sqlQueries.addUser, [userEmail, 0, undefined, 0, undefined], function (error, results, fields) {
                        if (error) {
                            return reject(error)
                        }

                        console.log(results);

                        return resolve(results);
                    });
                    connection.end();

                });


            } catch (err) {
                server.log(err);
                return boom.boomify(err);
            }

        }
    });

    server.route({
        method: "POST",
        path: "/api/sudokleQueries/addSudoku",

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

                const {puzzles, solutions, creationDate} = request.payload;

                return new Promise((resolve, reject) => {
                    connection.query(sqlQueries.addSudoku, [puzzles, solutions, new Date()], function (error, results, fields) {
                        if (error) {
                            return reject(error)
                        }

                        console.log(results);

                        return resolve(results);
                    });
                    connection.end();

                });


            } catch (err) {
                server.log(err);
                return boom.boomify(err);
            }

        }
    });


}
