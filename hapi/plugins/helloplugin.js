/* jshint node: true, esversion: 6*/
'use strict';

const helloplugin = (server, option, next) => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('Hello Cassie');
        }
    });
    next();
};

exports.register = helloplugin;

exports.register.attributes = {
    name: 'helloplugin',
    version: '1.0.0'
};

