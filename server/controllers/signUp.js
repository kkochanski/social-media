'use strict';

/**
 * Simple sign up action
 * 
 * @param request
 * @param reply
 * @returns {*}
 */
exports.signUp = function (request, reply) {
    var userValidationSchema = require('./../validation_schemas/user.js'),
        validation = require('../services/validation'),
        response = validation.validate(request.payload, userValidationSchema)
        ;

    if(response === null) {
        var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;
        models.user.create(request.payload);
    }
    response = {data: {'aa': 'a'}};

    // var JWT   = require('jsonwebtoken');
    // var obj   = { id:123,"name":"Charlie" }; // object/info you want to sign
    // var token = JWT.sign(obj, '123123123');


    return reply(response);
};

exports.signUpConfirmation = function (request, reply) {

    var response = {data: {'bbb': request.params.token}};

    // var JWT   = require('jsonwebtoken');
    // var obj   = { id:123,"name":"Charlie" }; // object/info you want to sign
    // var token = JWT.sign(obj, '123123123');


    return reply(response);
};