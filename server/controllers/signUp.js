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
        _ = require('underscore'),
        sequelize = request.server.plugins['hapi-sequelize'].db.sequelize;

    new Promise(function(resolve, reject) {
        var validationResult = validation.validate(request.payload, userValidationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(function(response) {
        var models = sequelize.models,
            toSave = _.clone(request.payload);
        toSave.confirmationToken = require('crypto').randomBytes(64).toString('hex');

        return sequelize.transaction().then(function(t) {
            return models.user.create(toSave, {transaction: t}).catch(function(err) {
                return Promise.reject({'code': 'db-error', 'msg': err});
            }).then(function (user) {
                var confirmationUrl = request.server.app.serverUrl + '/sign-up/confirmation/' + user.confirmationToken,
                    mailOptions = {
                    from: request.server.app.di.container.configLoader.get('/email/config/from'),
                    to: user.email,
                    subject: 'Account registration',
                    html: '<h3>Hello ' + user.firstName + '</h3> <div>Thank you for your registration. To end up your sign up process, please confirm your e-mail address by click this url: <a href="' + confirmationUrl + '/' + '">Confirmation URL</a> </div>'
                };

                return request.server.app.di.container.mailTransporter.sendMail(mailOptions);
            }).catch(function(err) {
                return Promise.reject(err.code === 'db-error' ? err : {'code': 'mail-error', 'msg': err});
            }).then(function() {
                t.commit();
                return Promise.resolve();
            }).catch(function (err) {
                t.rollback();
                return Promise.reject(err);
            });
        });

    }).catch(function(error) {
        if(typeof error === 'object' && error.isBoom) {
            return error;
        }

        var Boom = require('boom'),
            errorRowLog = 'Error in \'signUp\' action. Code: \'%s\'';
        request.server.app.di.container.logger.error(
            errorRowLog,
            typeof error === 'object' && error.code !== undefined ?  error.code : 'default-error',
            typeof error === 'object' && error.msg !== undefined ? error.msg : ''
        );
        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(function(response) {
        if(response === undefined) {
            response = request.payload;
            response.password = undefined;
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

    // console.log(request.server.app.key);


    var response = {data: {'bbb': request.params.token}};

    return reply(response);
};