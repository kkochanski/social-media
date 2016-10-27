'use strict';


const Promise = require('bluebird'),
    Boom = require('boom'),
    _ = require('underscore'),
    jwt = require('jsonwebtoken')
    ;


/**
 * Login
 *
 * @param request
 * @param reply
 * @returns {*}
 */
exports.login = (request, reply) => {

    const bcrypt = require('bcrypt'),
        Joi = require('joi'),
        validationService = require('../services/validationService'),
        validationSchema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }),
        tokenConfig = request.server.app.di.container.config.token
        ;


    new Promise((resolve, reject) => {
        const validationResult = validationService.validate(request.payload, validationSchema);
        if(validationResult === null) {
            resolve();
        } else {
            reject(validationResult);
        }
    }).then(response => {
        return request.server.app.di.container.userModel.then(userModel => {
            return userModel.findOne({'email': request.payload.email}).then(user => {
                if(user !== null) {

                    if(bcrypt.compareSync(request.payload.password, user.password) === true) {
                        const moment = require('moment');
                        const tokenValidateDate = moment().add(tokenConfig.expirationTime, 'seconds'),
                            tokenData = {
                                userId: user.id,
                                exp: tokenValidateDate.unix()
                            },
                            freshAuthToken = jwt.sign(tokenData, tokenConfig.key)
                            ;

                        return request.server.app.di.container.tokenModel.then(tokenModel => {
                            let tokenDocument = {
                                token: freshAuthToken,
                                userId: user._id,
                                validTo: tokenValidateDate.toDate(),
                                request: {
                                    userAgent: request.headers['user-agent'],
                                    ip: request.info.remoteAddress,
                                }
                            };
                            tokenDocument = new tokenModel(tokenDocument);

                            return tokenDocument.save().then(createdTokenDocument => {
                                return Promise.resolve({token: freshAuthToken});
                            });
                        });
                    } else {
                        return Boom.notAcceptable('Password for given e-mail is incorrect.');
                    }
                } else {
                    return Boom.notAcceptable('There is no account with given e-mail.');
                }
            })
        })
    }).catch(err => {
        if(typeof err === 'object' && err.isBoom) {
            return err;
        }
        request.server.app.di.container.logger.error('Error in \'login\' action, in ' + __filename, err);

        return Boom.notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
        if(!response.isBoom) {
            return reply(response)
                .header('Authorization', response.token)
                .state('token', response.token, tokenConfig.cookieOptions) ;
        } else {
            return reply(response);
        }
    });
};

/**
 * Logout
 *
 * @param request
 * @param reply
 * @returns {*}
 */
exports.logout = (request, reply) => {

    const jwtToken = request.headers.authorization;

    return request.server.app.di.container.tokenModel.then(tokenModel => {
        var decodedToken = jwt.decode(jwtToken, request.server.app.di.container.config.token.key);

        return tokenModel.remove({
            'userId': decodedToken.userId,
            'token': jwtToken,
            'request.userAgent': request.headers['user-agent'],
            'ip': request.info.remoteAddress
        }).then(() => {
            return Promise.resolve({})
        });
    }).catch(err => {
        request.server.app.di.container.logger.error('Error in \'logout\' action, in ' + __filename, err);

        return require('boom').notAcceptable('Unexpected error occurred. Please try again or contact with admin.');
    }).then(response => {
        return reply(response).unstate('token');
    });
};