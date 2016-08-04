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
        _ = require('underscore');

    new Promise(function(resolve, reject) {
        var validationResult = validation.validate(request.payload, userValidationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(function(response) {
        var models = request.server.plugins['hapi-sequelize'].db.sequelize.models,
            toSave = _.clone(request.payload);
        toSave.confirmationToken = require('crypto').randomBytes(64).toString('hex');
        return models.user.create(toSave)
    }).catch(function(error) {
        if(error.isBoom) {
            return error;
        }
        var Boom = require('boom');
        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(function(response) {
        if(!response.isBoom) {
            response = request.payload;
        }
        return reply(response);
    });
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