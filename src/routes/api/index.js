"use strict";

const sudokleQueries = require("./sudokleQueries");

module.exports.register = async server => {
    await sudokleQueries.register(server)
};