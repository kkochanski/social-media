const Joi = require('joi');

module.exports = [
    {
        path: '/',
        method: 'GET',
        handler: require('../../../controllers/indexController'),
        config: { 
            auth: false
        }
        //  config: { auth: 'jwt', plugins: {'hapiAuthorization': {roles: ['EMPLOYEE']}} } // 
    }
];