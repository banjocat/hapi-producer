/* jshint node: true, esversion: 6*/
'use strict';

const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({port: 3000});


server.register([
        {
            register: require('./plugins/kafka/kafakplugin.js'),
            path: '/kafka',
            options: {
                zookeeper: 'zookeeper:2181'
            }
        },
        {
            register: require('./plugins/helloplugin.js'),
            path: '/'
        }
], (err) => {
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
