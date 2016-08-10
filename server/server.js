'use strict';


const Hapi = require('hapi');
const Confidence = require('confidence');
const Nodemailer = require('nodemailer');
const Bottle = require('bottlejs');
const Promise = require('bluebird');

var configLoader = new Confidence.Store();
configLoader.load(require('./config/config.json'));

const server = new Hapi.Server();
server.connection({
    host: 'localhost',
    port: 8000,
    routes: {
        cors: true
    }
});

var dependencyInjection = new Bottle();
dependencyInjection.service('mailTransporter', function(){ return Nodemailer.createTransport(configLoader.get('/email/mailer')) });
dependencyInjection.service('configLoader', function(){ return configLoader });
dependencyInjection.service('logger', function(){
    var winston = require('winston');
    return new(winston.Logger)({
        transports: [
            new(winston.transports.Console)(),
            new(winston.transports.File)({filename: 'logs/logs.log'})
        ]
    });
});
dependencyInjection.service('mongoose', function(){
    var mongoose = require('mongoose');
    mongoose.Promise = Promise;

    return mongoose.connect(configLoader.get('/db/dev')).then(function() {
        return Promise.resolve(mongoose);
    }).catch(function(err) {
        return Promise.reject(err);
    });
});
dependencyInjection.factory('conversationModel', function(container){
    return container.mongoose.then(function(mongoose) {
        return Promise.resolve(mongoose.model('conversation', require('./db/models/conversation.js')));
    }).catch(function(err){
        return Promise.reject(err);
    });
});
dependencyInjection.factory('groupModel', function(container){
    return container.mongoose.then(function(mongoose) {
        return Promise.resolve(mongoose.model('group', require('./db/models/group.js')));
    }).catch(function(err){
        return Promise.reject(err);
    });
});
dependencyInjection.factory('postModel', function(container){
    return container.mongoose.then(function(mongoose) {
        return Promise.resolve(mongoose.model('post', require('./db/models/post.js')));
    }).catch(function(err){
        return Promise.reject(err);
    });
});
dependencyInjection.factory('userModel', function(container){
    return container.mongoose.then(function(mongoose) {
        return Promise.resolve(mongoose.model('user', require('./db/models/user.js')));
    }).catch(function(err){
        return Promise.reject(err);
    });
});
server.app.di = dependencyInjection;
server.app.serverUrl = 'http://localhost:8000';

server.register(require('hapi-auth-jwt2'), function (err) {

    if(err){
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
        { key: 'NeverShareYourSecret',
            validateFunc: function (decoded, request, callback) {

                // var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;

                // if (0) {
                    return callback(null, false);
                // }
                // else {
                //     return callback(null, false, {role: 'EMPLOYEE'});
                // }
            },
            verifyOptions: { algorithms: [ 'HS256' ] }
        });

    server.auth.default('jwt');
});

server.register(
    [
        {
            register: require('good'),
            options: {
                ops: {
                    interval: 1000
                },
                reporters: {
                    console: [{
                        module: 'good-squeeze',
                        name: 'Squeeze',
                        args: [{log: '*', response: '*'}]
                    }, {
                        module: 'good-console'
                    }, 'stdout'],
                }
            }
        },
        {
            register: require('hapi-router'),
            options: {
                routes: 'config/routes/**/*.js'
            }
        },
        {
            register: require('hapi-authorization'),
            options: {}
        }
    ], function(err) {
        if (err) {
            console.error(err);
        } else {
            server.start(function () {
                console.info('Server started at ' + server.info.uri);
            });
        }
    }
    
);