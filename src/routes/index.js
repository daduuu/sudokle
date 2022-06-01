"use strict";

const api = require("./api");
const path = require("path");
const inert = require('@hapi/inert');



module.exports.register = async server => {

    await api.register(server);

    server.route({
        method:"GET",
        path:"/",
        handler: async (request, h) => {
            return 'hello world'
        }
    });
/*

    server.route({
        method:"GET",
        path:"/leaderboard.html",
        handler: async (request, h) => {
            return h.file('./views/leaderboard.html');
        }
    });
*/

};