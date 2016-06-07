'use strict';

angular
    .module('app.directives')
    .directive('formErrorsMainMessage', formErrorsMainMessage)
;

function formErrorsMainMessage() {
    return {
        restrict: 'AE',
        replace: 'false',
        scope: {
            statement: '='
        },
        template: '<div ng-show="statement" class="ui negative message"> <i class="close icon"></i> <div class="header">Error - invalid data</div><p>Please correct data from inputs below</p></div>'
    };
}