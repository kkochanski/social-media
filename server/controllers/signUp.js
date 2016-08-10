'use strict';

/**
 * Simple sign up action
 *
 * @param request
 * @param reply
 * @returns {*}
 */
exports.signUp = function (request, reply) {
    var userValidationSchema = require('./../db/validation_schemas/user.js'),
        validation = require('../services/validation'),
        Promise = require('bluebird'),
        _ = require('underscore');

    new Promise(function(resolve, reject) {
        var validationResult = validation.validate(request.payload, userValidationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(function(response) {
        var toSave = _.clone(request.payload);
        toSave.confirmationToken = require('crypto').randomBytes(28).toString('hex');
        var userModel = request.server.app.di.container.userModel;

        return userModel.then(function (model) {
            var user = new model(toSave);
            return user.save().catch(function(err) {
                return Promise.reject({'code': 'db-error', 'msg': err});
            }).then(function (createdUser) {
                var confirmationUrl = request.server.app.serverUrl + '/sign-up/confirmation/' + user.confirmationToken,
                    mailOptions = {
                        from: request.server.app.di.container.configLoader.get('/email/config/from'),
                        to: createdUser.email,
                        subject: 'Account registration',
                        html: '<h3>Hello ' + createdUser.firstName + '</h3> <div>Thank you for your registration. To end up your sign up process, please confirm your e-mail address by click this url: <a href="' + confirmationUrl + '/' + '">Confirmation URL</a> </div>'
                    };

                return request.server.app.di.container.mailTransporter.sendMail(mailOptions);
            }).catch(function(err) {
                return Promise.reject(err.code === 'db-error' ? err : {'code': 'mail-error', 'msg': err});
            }).then(function() {
                return Promise.resolve();
            }).catch(function (err) {
                return Promise.reject(err);
            });
        }).catch(function (err) {
            return Promise.reject(err);
        })
    }).catch(function(error) {
        if(typeof error === 'object' && error.isBoom) {
            return error;
        }

        var Boom = require('boom'),
            errorRowLog = 'Error in \'signUp\' action. Code: \'%s\'',
            messageToUser = 'Unexpected error occurred. Please try again or contact with admin.';
        request.server.app.di.container.logger.error(
            errorRowLog,
            typeof error === 'object' && error.code !== undefined ?  error.code : 'default-error',
            typeof error === 'object' && error.msg !== undefined ? error.msg : error
        );
        if(error.code === 'mail-error') {
            messageToUser = 'User was created, but failed to send email. We will try to send next e-mail as soon as possible. Also on your each login, we will try to resend confirmation e-mail.'
        }
        return Boom.notAcceptable(messageToUser);
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