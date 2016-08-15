'use strict';


angular.module('app.routes', [
    'ui.router'
]).
config(function($stateProvider, $locationProvider, $urlRouterProvider) {

    var loggedMenu = {
        templateUrl: 'components/menu/logged-menu.html',
        controller: 'loggedMenuController',
        controllerAs: 'vm'
    };

    var notLoggedMenu = {
        templateUrl: 'components/menu/not-logged-menu.html',
        controller: 'notLoggedMenuController',
        controllerAs: 'vm'
    };

    $stateProvider
        .state('home', {
            url: '/',
            views: {
                content: {
                    templateUrl: 'components/home/home.html'
                },
                preContent: {
                    templateUrl: 'components/home/pre-content.html'
                },
                menu: notLoggedMenu
            }
        })
        .state('signUpConfirmation', {
            url: '/sign-up/confirmation/:token',
            views: {
                content: {
                    templateUrl: 'components/sign_up/sign-up-confirmation.html'
                },
                preContent: {
                    templateUrl: 'components/home/pre-content.html'
                },
                menu: notLoggedMenu
            }
        })
        .state('account', {
            url: '/account',
            views: {
                content: {
                    templateUrl: 'components/account/account.html',
                    controller: 'accountController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            views: {
                content: {
                    templateUrl: 'components/dashboard/dashboard.html',
                    controller: 'dashboardController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('friends', {
            url: '/friends',
            views: {
                content: {
                    templateUrl: 'components/friends/friends.html',
                    controller: 'friendsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('groups', {
            url: '/groups',
            views: {
                content: {
                    templateUrl: 'components/groups/groups.html',
                    controller: 'groupsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('messages', {
            url: '/messages',
            views: {
                content: {
                    templateUrl: 'components/messages/messages.html',
                    controller: 'messagesController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('notifications', {
            url: '/notifications',
            views: {
                content: {
                    templateUrl: 'components/notifications/notifications.html',
                    controller: 'notificationsController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
        .state('profile', {
            url: '/profile',
            views: {
                content: {
                    templateUrl: 'components/profile/profile.html',
                    controller: 'profileController',
                    controllerAs: 'vm'
                },
                preContent: {
                    templateUrl: 'components/secondary_menu/secondary-menu.html'
                },
                menu: loggedMenu
            }
        })
    ;


    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/error');
});