'use strict';

const chalk = require('chalk');

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

console.log(chalk.grey.bgYellow('Running server in ' + process.env.NODE_ENV + ' environment'));

const Hapi = require('hapi'),
    Nodemailer = require('nodemailer'),
    Bottle = require('bottlejs'),
    Promise = require('bluebird')
    ;

const basicConfig = require('./config/config.json'),
    envConfig = require('./config/config_' + process.env.NODE_ENV + '.json'),
    config = Object.assign(basicConfig, envConfig);


const server = new Hapi.Server(),
    configServerOptions = config.serverOptions,
    notConfigServerOptions = {
        routes: {
            cors: true
        }
    },
    serverOptions = Object.assign(configServerOptions, notConfigServerOptions);
server.connection(serverOptions);

const dependencyInjection = new Bottle();
dependencyInjection.service('mailTransporter', function() { return Nodemailer.createTransport(config.email.mailer) });
dependencyInjection.service('config', function() { return config });
dependencyInjection.service('logger', function() {
    var winston = require('winston');
    return new(winston.Logger)({
        transports: [
            new(winston.transports.Console)(),
            new(winston.transports.File)({filename: 'logs/logs.log'})
        ]
    });
});
dependencyInjection.service('mongoose', function() {
    const mongoose = require('mongoose');
    mongoose.Promise = Promise;

    return mongoose.connect(config.db.connectionString).then(() => {
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
dependencyInjection.factory('conversationModel', function(container) {
    return registerMongooseModel(container, 'conversationModel');
});
dependencyInjection.factory('groupModel', function(container) {
    return registerMongooseModel(container, 'groupModel');
});
dependencyInjection.factory('postModel', function(container) {
    return registerMongooseModel(container, 'postModel');
});
dependencyInjection.factory('userModel', function(container) {
    return registerMongooseModel(container, 'userModel');
});
server.app.di = dependencyInjection;
server.app.serverUrl = `http://${serverOptions.host}:${serverOptions.port}`;

server.register(
    [
        {
            register: require('hapi-auth-jwt2')
        },
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
        // {
        //     register: require('hapi-authorization'),
        //     options: {}
        // }
    ], (err) => {
        if (err) {
            console.error(err);
        } else {
            server.auth.strategy('jwt', 'jwt', {
                key: config.token.key,
                validateFunc(decoded, request, callback) {

                    console.log(decoded);
                    console.log(request.auth.token);
                    return callback(null, false);

                    // if (0) {
                    //     return callback(null, false);
                    // }
                    // else {
                    // return callback(null, false, {role: 'EMPLOYEE'});
                    // }
                },
                verifyOptions: {
                    algorithms: [ 'HS256' ],
                    ignoreExpiration: false
                }
            });

            server.auth.default('jwt');

            server.register({
                register: require('hapi-router'),
                options: {
                    routes: 'config/routes/**/*.js'
                }
            }, err => {
                if (err) throw err;
            });

            server.start(() => {
                console.info('Server started at ' + server.info.uri);
            });
        }
    }

);