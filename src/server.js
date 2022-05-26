"use strict";


const Hapi = require('@hapi/hapi');
const routes = require("./routes");
const inert = require("@hapi/inert");
const vision = require('@hapi/vision');
const engine = require('hapi-react-views');


const app = async config => {

    const {host, port} = config;

    const server = Hapi.server({ host, port });


    server.app.config = config;

    await server.register(inert);

    await server.register(vision);

    await routes.register(server);

    server.views({
        defaultExtension: 'jsx',
        engines: {
            jsx: engine, // support for .jsx files
            js: engine // support for .js
        }
    });



    return server;



};

module.exports = app;


