'use strict';

/**
 * Simple sign up action
 *
 * @param request
 * @param reply
 * @returns {*}
 */
exports.signUp = (request, reply) => {
    const userValidationSchema = require('./../db/validation_schemas/userValidationSchema.js'),
        validation = require('../services/validationService'),
        Promise = require('bluebird'),
        _ = require('underscore'),
        bcrypt = require('bcrypt');


    new Promise((resolve, reject) => {
        const validationResult = validation.validate(request.payload, userValidationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(response => {
        return request.server.app.di.container.userModel.then(userModel => {
            let toSave = _.clone(request.payload);
            toSave.confirmationToken = require('crypto').randomBytes(28).toString('hex');
            toSave.password = bcrypt.hashSync(toSave.password, 10);
            const user = new userModel(toSave);

            return user.save().catch(err => {
                return Promise.reject({code: 'db-error', msg: err});
            }).then(createdUser => {
                const confirmationUrl = request.server.app.serverUrl + '/sign-up/confirmation/' + user.confirmationToken,
                    mailOptions = {
                        from: request.server.app.di.container.configLoader.get('/email/config/from'),
                        to: createdUser.email,
                        subject: 'Account registration',
                        html: '<h3>Hello ' + createdUser.firstName + '</h3> <div>Thank you for your registration. To end up your sign up process, please confirm your e-mail address by click this url: <a href="' + confirmationUrl + '/' + '">Confirmation URL</a> </div>'
                    };

                return request.server.app.di.container.mailTransporter.sendMail(mailOptions);
            }).catch(err => {
                if(err.code !== 'db-error') {
                    err = {code: 'mail-error', msg: err};
                    userModel.remove({'_id': user['_id']}, (err) => { /* Remove already created user. Callback is needed, without that, removal won't work. */
                        console.log('Error while removing user on send mail fail: ' + err);
                    });
                }
                return Promise.reject(err);
            }).then(() => {
                return Promise.resolve();
            }).catch( (err) => {
                return Promise.reject(err);
            });
        }).catch(function (err) {
            return Promise.reject(err);
        })
    }).catch(error => {
        if(typeof error === 'object' && error.isBoom) {
            return error;
        }

        const Boom = require('boom'),
            errorRowLog = 'Error in \'signUp\' action.';
        request.server.app.di.container.logger.error(errorRowLog, error);

        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
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
exports.signUpConfirmation = (request, reply) => {

    const userModel = request.server.app.di.container.userModel,
        Promise = require('bluebird');

    userModel.then(userModel => {
        return userModel.findOne({'confirmationToken': request.payload.token, 'confirmedAt': null}).then(user => {
            if(user === null) {
                return userModel.findOne({'confirmationToken': request.payload.token}).then(function(user) {
                    const msg = user !== null ? 'Your e-mail is already confirmed.' : 'Can\'t find user with given token. Your token is invalid.',
                        err = {code: 'internal', msg: msg};

                    return Promise.reject(err);
                })
            }

            return user.update({'confirmedAt': new Date()}).then((err, numberAffected, rawResponse) => {
                return Promise.resolve({'email': user.email, 'firstName': user.firstName, 'lastName': user.lastName, 'confirmationToken': user.confirmationToken});
            }).catch(err => {
                return Promise.reject({code: 'db-error', msg: err});
            });
        }).catch(err => {
            return Promise.reject(err.code === 'internal' ? err : {code: 'default-error', msg: err});
        });
    }).catch(err => {
        const Boom = require('boom');
        if(err.code === undefined) {
            err = {code : 'default-error', msg: err};
        }

        request.server.app.di.container.logger.error('Error in \'signUpConfirmation\' action', err);

        return Boom.notAcceptable(err.code === 'internal' ? err.msg : 'Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
        return reply(response);
    });
};