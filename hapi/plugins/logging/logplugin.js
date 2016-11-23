/* jshint node: true, esversion: 6*/
'use strict';
var bunyan = require('bunyan');
var _ = require('lodash');


var logging = (server, options, next) => {
    var log = bunyan.createLogger({
        name: 'hapi',
        streams: [
        {
            level: 'info',
            stream: process.stdout
        }
        ]
    });

    var log_levels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace'];

    server.on('log', (event, tags) => {
        if (event) {
            logEvent(event, tags);
        }
    });


    function logEvent(event, tags) {
        if (tags.fatal) {
            log.fatal(event);
        }
        else if (tags.error) {
            log.error(event);
        }
        else if (tags.warn) {
            log.warn(event);
        }
        else if (tags.info) {
            log.info(event);
        }
        else if (tags.debug) {
            log.debug(event);
        }
        else if (tags.trace) {
            log.trace(event);
        }
        else {
            log.info(event);
        }
    }
    next();
};

exports.register = logging;

exports.register.attributes = {
    name: 'logging-plugin',
    version: '1.0.0'
};


