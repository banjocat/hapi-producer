/* jshint node: true, esversion: 6*/
'use strict';
var kafka = require('kafka-node');


var producer = (server, options, next) => {
    console.info('creating producer');
    var Producer = kafka.Producer;
    var client = new kafka.Client(options.zookeeper);
    var producer = new Producer(client);

    const success = {"message": "success"};
    const failure = {"message": "failure"};


    producer.on('ready', () => {
        server.route({
            method: 'POST',
            path: '/kafka',
            handler: writeToKafka
        });
        console.log('kafka ready');
        next();
    });

    producer.on('error', error => {
        console.error(error);
    });

    // Creates the message to send to kafka
    function createMessage(request) {
        var message = {
            topic: 'json',
            messages: request.payload
        };
        return message;
    }

    // Writes a json request to kafka
    function writeToKafka(request, reply) {
        if (producer.ready === false) {
            console.log('Not ready!');
        }
        else {
            var message = createMessage(request);
            producer.send([message], (err, data) => {
                if (err) {
                    reply(failure);
                }
                else {
                    reply(success);
                }
            });
        }
    }

};


exports.register = producer;

exports.register.attributes = {
    name: 'kafka-plugin',
    version: '1.0.0'
};


