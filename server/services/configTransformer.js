'use strict';

module.exports = function(config) {

    const _ = require('underscore'),
        initialConfig = config;

    function iterateOverConfig(config) {
        for(let key in config) {
            let value = config[key];

            if(_.isFunction(value)) {
                config[key] = value(initialConfig);
            } else if(_.isObject(value)) {
                iterateOverConfig(value);
            }
        }
    }

    iterateOverConfig(config);

    return config;
};