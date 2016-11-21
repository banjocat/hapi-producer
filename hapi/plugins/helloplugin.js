/* jshint node: true, esversion: 6*/
'use strict';

const helloplugin = {
    register: (server, option, next) => {
        server.method('hello', () => {
            return "hello cassie";
        }, {});
        server.method('goodbye', () => {
            return "goodbye cassie";
        }, {});
        next();
    }
};

helloplugin.register.attributes = {
    name: 'helloplugin',
    version: '1.0.0'
};

exports.register = helloplugin;
