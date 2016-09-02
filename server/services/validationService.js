'use strict';

module.exports = {
    basicValidationOptions: {abortEarly: false},
    validate(data, schema, options) {
        var Joi = require('joi'),
            Boom = require('boom'),
            _ = require('underscore'),
            errorsWithMessages = {},
            toReturn = null
            ;
        options = options !== undefined ? _.extend(this.basicValidationOptions, options) : this.basicValidationOptions;

        var validation = Joi.validate(data, schema, options);
        if(validation.error) {
            validation.error.details.forEach(element => {
                errorsWithMessages[element.path] = element.message;
            });
            toReturn = Boom.badData('Validation failure');
            toReturn.output.payload.invalid_keys = errorsWithMessages;
        }

        return toReturn;
    }
};