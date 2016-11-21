/* jshint node: true, esversion: 6*/
'use strict';

const helloplugin = {
    register: (server, option, next) => {
        server.route({
            method: 'GET',
            path: '/',
            handler: (request, reply) => {
                reply('Hello Cassie');
            }
        });
        next();
    }
};

helloplugin.register.attributes = {
    name: 'helloplugin',
    version: '1.0.0'
};

exports.register = helloplugin;
