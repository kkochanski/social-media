'use strict';


const Hapi = require('hapi'),
    Confidence = require('confidence'),
    Nodemailer = require('nodemailer'),
    Bottle = require('bottlejs'),
    Promise = require('bluebird'),
    configLoader = new Confidence.Store()
    ;

configLoader.load(require('./config/config.json'));

const server = new Hapi.Server(),
    serverOptions = {
        host: 'localhost',
        port: 8000,
        routes: {
            cors: true
        }
    };
server.connection(serverOptions);

const dependencyInjection = new Bottle();
dependencyInjection.service('mailTransporter',() => { Nodemailer.createTransport(configLoader.get('/email/mailer')) });
dependencyInjection.service('configLoader', () => { configLoader });
dependencyInjection.service('logger', () => {
    var winston = require('winston');
    return new(winston.Logger)({
        transports: [
            new(winston.transports.Console)(),
            new(winston.transports.File)({filename: 'logs/logs.log'})
        ]
    });
});
dependencyInjection.service('mongoose', () => {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;

    return mongoose.connect(configLoader.get('/db/dev')).then(() => {
        return Promise.resolve(mongoose);
    }).catch(err => {
        return Promise.reject(err);
    });
});
function registerMongooseModel(container, modelName) {
    return container.mongoose.then(mongoose => {
        return Promise.resolve(mongoose.model(modelName, require('./db/models/' + modelName + '.js')));
    }).catch(err => {
        return Promise.reject(err);
    });
}
dependencyInjection.factory('conversationModel', container => {
    return registerMongooseModel(container, 'conversationModel');
});
dependencyInjection.factory('groupModel', container => {
    return registerMongooseModel(container, 'groupModel');
});
dependencyInjection.factory('postModel', container => {
    return registerMongooseModel(container, 'postModel');
});
dependencyInjection.factory('userModel', container => {
    return registerMongooseModel(container, 'userModel');
});
server.app.di = dependencyInjection;
server.app.serverUrl = `http://${serverOptions.host}:${serverOptions.port}`;
server.register(require('hapi-auth-jwt2'), err => {

    if(err){
        console.log(err);
    }

    server.auth.strategy('jwt', 'jwt',
        { key: 'NeverShareYourSecret',
            validateFunc: (decoded, request, callback) => {

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
    ], (err) => {
        if (err) {
            console.error(err);
        } else {
            server.start(() => {
                console.info('Server started at ' + server.info.uri);
            });
        }
    }
    
);