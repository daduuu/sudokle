"use strict";

const textBoxes = require("./sudokleQueries");

module.exports.register = async server => {
    await textBoxes.register(server)
};