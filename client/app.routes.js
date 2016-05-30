'use strict';


angular.module('app.routes', [
    'ui.router'
]).
config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/error');

    $stateProvider
        .state('home', {
            url: '/',
            views: {
                content: {
                    templateUrl: 'components/home/homeView.html'
                },
                preContent: {
                    templateUrl: 'components/home/preContentView.html'
                },
                menu: {
                    templateUrl: 'shared/menu/notLoggedMenuView.html',
                    controller: 'notLoggedMenuController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            views: {
                content: {
                    templateUrl: 'components/dashboard/dashboardView.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
            }
        })
    ;
});