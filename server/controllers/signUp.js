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
        response = {data: request.payload};
    }

    
    return reply(response);
};

/**
 * Sign up confirmation
 * 
 * @param request
 * @param reply
 * @returns {*}
 */
exports.signUpConfirmation = function (request, reply) {
    var response = {data: {'bbb': request.params.token}};

    return reply(response);
};