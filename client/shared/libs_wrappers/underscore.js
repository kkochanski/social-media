'use strict';

angular
    .module('app.factories')
    .factory('underscore', underscore)
;

function underscore() {
    return window._;
}