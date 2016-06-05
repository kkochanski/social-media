'use strict';

module.exports = function(request, reply) {

    // var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;

    // models.User.create({ first_name: 'testa', last_name: 'haaa', email: 'gohanzo@o2.pl', password: 'eeee', confirmation_token: 'tak' });


    var userValidationSchema = require('./../validation_schemas/user.js'),
        validation = require('../services/validation'),
        response = validation.validate(request.payload, userValidationSchema)
        ;


    
    // var JWT   = require('jsonwebtoken');
    // var obj   = { id:123,"name":"Charlie" }; // object/info you want to sign
    // var token = JWT.sign(obj, '123123123');


    return reply(response);
};