/* jshint node: true, esversion: 6*/
'use strict';
var kafka = require('kafka-node');


var producer = (server, options, next) => {
    var Producer = kafka.Producer;
    var client = new kafka.Client(options.zookeeper);
    var producer = new Producer(client);

    producer.on('ready', () => {
        console.log('Kafka ready');
    });

    producer.on('error', error => {
        console.log(error);
    });


    console.log(producer.ready);

    const success = {"message": "success"};

    server.route({
        method: 'POST',
        path: '/kafka',
        handler: (request, reply) => {

            if (producer.ready) {
                var message = {
                    topic: 'json',
                    messages: request.payload,
                };
                producer.send([message], (err, data) => {
                    if (err) {
                        console.log('error');
                    }
                    else {
                        console.log('done');
                    }
                });
            }
            else {
                console.log('Producer is not ready');
            }
            reply(success);
        }
    });
    next();
};


exports.register = producer;

exports.register.attributes = {
    name: 'kafka-plugin',
    version: '1.0.0'
};


