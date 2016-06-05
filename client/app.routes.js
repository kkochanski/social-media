'use strict';


angular.module('app.routes', [
    'ui.router'
]).
config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    var loggedMenu = {
        templateUrl: 'shared/menu/loggedMenuView.html',
        controller: 'loggedMenuController',
        controllerAs: 'vm'
    };

    var notLoggedMenu = {
        templateUrl: 'shared/menu/notLoggedMenuView.html',
        controller: 'notLoggedMenuController',
        controllerAs: 'vm'
    };

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
                menu: notLoggedMenu
            }
        })
        .state('account', {
            url: '/account',
            views: {
                content: {
                    templateUrl: 'components/account/accountView.html',
                    controller: 'accountController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
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
                menu: loggedMenu
            }
        })
        .state('friends', {
            url: '/friends',
            views: {
                content: {
                    templateUrl: 'components/friends/friendsView.html',
                    controller: 'friendsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
            }
        })
        .state('groups', {
            url: '/groups',
            views: {
                content: {
                    templateUrl: 'components/groups/groupsView.html',
                    controller: 'groupsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
            }
        })
        .state('messages', {
            url: '/messages',
            views: {
                content: {
                    templateUrl: 'components/messages/messagesView.html',
                    controller: 'messagesController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
            }
        })
        .state('notifications', {
            url: '/notifications',
            views: {
                content: {
                    templateUrl: 'components/notifications/notificationsView.html',
                    controller: 'notificationsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
            }
        })
        .state('profile', {
            url: '/profile',
            views: {
                content: {
                    templateUrl: 'components/profile/profileView.html',
                    controller: 'profileController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'shared/secondary_menu/secondaryMenuView.html'
                },
                menu: loggedMenu
            }
        })
    ;


    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/error');
});