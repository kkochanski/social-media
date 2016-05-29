'use strict';


angular.module('app.routes', [
    'ui.router'
]).
config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('error');

    $stateProvider
        .state('home', {
            url: '',
            views: {
                content: {
                    templateUrl: 'client/components/home/homeView.html'
                },
                preContent: {
                    templateUrl: 'client/components/home/preContentView.html'
                },
                menu: {
                    templateUrl: 'client/shared/menu/notLoggedMenuView.html',
                    controller: 'notLoggedMenuController',
                    controllerAs: 'vm'
                }
            }
        })
    ;
});