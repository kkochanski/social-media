const Joi = require('joi');

module.exports = [
    {
        path: '/',
        method: 'POST',
        handler: require('../../controllers/index'),
        config: { 
            auth: false
        }
        //  config: { auth: 'jwt', plugins: {'hapiAuthorization': {roles: ['EMPLOYEE']}} } // 
    }
];