/* jshint node: true, esversion: 6*/
'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({port: 3000});

const plugins = [
require('./plugins/logging/logplugin.js'),
{
    register: require('./plugins/kafka/kafakplugin.js'),
    path: '/kafka',
    options: {
        zookeeper: 'zookeeper:2181',
        zkconfig: {
            spinDelay: 10000,
            retries: 1000
        }
    }
},
{
    register: require('./plugins/helloplugin.js'),
    path: '/'
}
];

server.register(plugins,
(err) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            throw err;
        }
        server.log(['startup'], `Server running at: ${server.info.uri}`);
    });
});

