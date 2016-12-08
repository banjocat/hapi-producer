/* jshint node: true, esversion: 6*/
'use strict'
var MongoClient = require('mongodb').MongoClient;


var producer = (server, options, next) => {
    server.log(['mongo'], 'creating mongo producer');

};

