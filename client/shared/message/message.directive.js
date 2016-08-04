'use strict';

angular
    .module('app.directives')
    .directive('message', message)
;

message.$inject = [];

function message() {
    return {
        restrict: 'E',
        replace: true,
        scope: {
            'type': '@',
            'title': '@',
            'content': '@',
            'showMessage': '='
        },
        template: '<div ng-show="showMessage" class="ui {{ type }} message"><i class="close icon"></i> <div class="header" ng-if="title">{{ title }}</div> <p ng-bind-html="content"></p> </div>',
        link: function ($scope, element, attr) {
            element.find('i.close.icon').on('click', function() {
                $scope.showMessage = false;
                $(this).closest('.message').addClass('ng-hide');
            });
        }
    };
}