/* jshint node: true, esversion: 6*/
'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({port: 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
        const msg = server.methods.hello();
        reply(msg);
    }
});

server.route({
    method: 'GET',
    path: '/bye',
    handler: (request, reply) => {
        const msg = server.methods.goodbye();
        reply(msg);
    }
});


server.route({
    method: 'GET',
    path: '/{name}',
    handler: (request, reply) => {
        reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
    }
});

server.register([require('./helloplugin.js'), {
    register: Good,
    options: {
        reporters: {
            console: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
                }, {
                    module: 'good-console'
                }, 'stdout']
        }
    }
}], (err) => {
    if (err) {
        throw err;
    }
});

server.start((err) => {

    if (err) {
        throw err;
    }

    console.log(`Server running at: ${server.info.uri}`);
});
