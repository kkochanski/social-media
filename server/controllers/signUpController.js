'use strict';

const Promise = require('bluebird'),
    Boom = require('boom'),
    _ = require('underscore'),
    bcrypt = require('bcrypt')
    ;

/**
 * Simple sign up action
 *
 * @param request
 * @param reply
 * @returns {*}
 */
exports.signUp = (request, reply) => {
    const userValidationSchema = require('./../db/validation_schemas/userValidationSchema.js'),
        validation = require('../services/validationService');


    new Promise((resolve, reject) => {
        const validationResult = validation.validate(request.payload, userValidationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(response => {
        return request.server.app.di.container.userModel.then(userModel => {
            return userModel.findOne({email: request.payload.email }).then(user => {
                if(user !== null) {
                    return Promise.reject(Boom.notAcceptable('Your e-mail is already in used. Please choose another one or retrieve password to your account.'))
                } else {
                    return Promise.resolve();
                }
            }).then(() => {
                let toSave = _.clone(request.payload);
                toSave.confirmationToken = require('crypto').randomBytes(28).toString('hex');
                toSave.password = bcrypt.hashSync(toSave.password, 10);
                const user = new userModel(toSave);

                return user.save().then(createdUser => {
                    const configClientOptions = request.server.app.di.container.config.clientOptions;
                    const confirmationUrl = configClientOptions.url + '/sign-up/confirmation/' + user.confirmationToken,
                        mailOptions = {
                            from: request.server.app.di.container.config.email.config.from,
                            to: createdUser.email,
                            subject: 'Account registration',
                            html: '<h3>Hello ' + createdUser.firstName + '</h3> <div>Thank you for your registration. To end up your sign up process, please confirm your e-mail address by click this url: <a href="' + confirmationUrl + '/' + '">Confirmation URL</a> </div>'
                        };

                    return request.server.app.di.container.mailTransporter.sendMail(mailOptions).then(() => {
                        let response = request.payload;
                        response.password = undefined;
                        return Promise.resolve(response)
                    }).catch(err => {
                        userModel.remove({'_id': user['_id']}, (dbErr) => { /* Remove already created user. Callback is needed, without that, removal won't work. */
                            if(dbErr) {
                                console.log('Error while removing user on send mail fail: ' + dbErr);
                            }
                        });
                        return Promise.reject(err);
                    });
                })
            })
        });
    }).catch(error => {
        if(error.isBoom) {
            return error;
        }
        request.server.app.di.container.logger.error('Error in \'signUp\' action, in ' + __filename, error);

        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
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

    const userModel = request.server.app.di.container.userModel;

    userModel.then(userModel => {
        return userModel.findOne({'confirmationToken': request.payload.token, 'confirmedAt': null}).then(user => {
            if(user === null) {
                return userModel.findOne({'confirmationToken': request.payload.token}).then(user => {
                    if(user !== null) {
                        return Promise.reject(Boom.notAcceptable('Your e-mail is already confirmed.'));
                    } else {
                        return Promise.reject(Boom.notAcceptable('Can\'t find user with given token. Your token is invalid..'));
                    }
                })
            }

            return user.update({'confirmedAt': new Date()}).then((err, numberAffected, rawResponse) => {
                return Promise.resolve({'email': user.email, 'firstName': user.firstName, 'lastName': user.lastName, 'confirmationToken': user.confirmationToken});
            })
        })
    }).catch(err => {
        if(typeof err === 'object' && err.isBoom) {
            return err;
        }

        request.server.app.di.container.logger.error('Error in \'signUpConfirmation\' action, in ' + __filename, err);

        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
        return reply(response);
    });
};