'use strict';

module.exports = {
    db: {
        connectionString: 'mongodb://localhost:27017/'
    },
    email: {
        mailer: {
            host: '',
            port: 587,
            auth: {
                user: '',
                pass: ''
            }
        },
        config: {
            'from': ''
        }
    },
    serverOptions: {
        host: 'localhost',
        port: 8000
    },
    clientOptions: {
        host: 'localhost',
        port: 80,
        url: config => config.clientOptions.port === 80 ? config.clientOptions.host : config.clientOptions.host + ':' + config.clientOptions.port
    },
    token: {
        key : '',
        expirationTime: 0,
        cookieOptions: {
            ttl: config => config.token.expirationTime * 1000,
            encoding: 'none',
            isSecure: true,
            isHttpOnly: true,
            clearInvalid: false,
            strictHeader: true,
            domain: config => config.clientOptions.url
        }
    },
};