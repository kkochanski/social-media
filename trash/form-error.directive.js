'use strict';
// <div form-error error="vm.signUpForm.password.$error" statement="vm.signUpForm.$submitted"></div>
angular
    .module('app.directives')
    .directive('formError', formError)
;

formError.$inject = ['underscore'];

function formError(_) {
    return {
        restrict: 'AE',
        replace: 'false',
        scope: {
            statement: '=',
            error: '='
        },
        template: '<div ng-messages="error" ng-show="statement"><div ng-messages-include="shared/validation/form-error-messages.html"></div></div>',
        link: function ($scope, element, attr) {
            /* There is a hack with $watchers. It's needed, because $watchGroup doesn't support deep comparison. */
            var ifFormSubmitted = false,
                lastKnownError = {}
                ;

            $scope.$watch('error', function (newValue, oldValue) {
                changeElementErrorClass(newValue);
                lastKnownError = newValue;
            }, true);

            $scope.$watch('statement', function (newValue, oldValue) {
                ifFormSubmitted = newValue;
                changeElementErrorClass(lastKnownError);
            }, true);


            function changeElementErrorClass(error) {
                var fieldContainer = element.parent('div.field');
                if (ifFormSubmitted === true) {
                    if (_.isEmpty(error)) {
                        fieldContainer.removeClass('error');
                    }
                    else {
                        fieldContainer.addClass('error');
                    }
                }
            }
        }
    };
}