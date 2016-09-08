'use strict';

angular
    .module('app.directives')
    .directive('formValidation', formValidation)
;

formValidation.$inject = ['underscore', 'sugar'];

function formValidation(_, sugar) {
    return {
        restrict: 'E',
        replace: false,
        scope: {
            'errors': '=',
            'formElement': '@'
        },
        link($scope, element, attr) {
            var $form = angular.element(attr.formElement)
                ;

            $form.find('input').on('focusout', function() {
                var $field = $(this).closest('.field');
                $field.removeClass('error').find('p.error-message').remove();
            });

            $scope.$watch('errors', function(validationErrors) {
                if(!_.isEmpty(validationErrors)) {
                    for(var field in validationErrors) {
                        var formattedFieldName = sugar.String(field).spacify().capitalize(),
                            formattedErrorMessage = validationErrors[field].replace(field, formattedFieldName),
                            $field = $form.find('[name="' + field + '"]').closest('div.field')
                            ;

                        $field.addClass('error');
                        if($field.find('p.error-message').length === 0) {
                            $field.append('<p class="error-message">' + formattedErrorMessage + '</p>');
                        }
                    }
                    $scope.errors = {};
                }
            }, true);
        }
    };
}