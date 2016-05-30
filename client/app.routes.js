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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
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
                menu: {
                    templateUrl: 'shared/menu/loggedMenuView.html',
                    controller: 'loggedMenuController',
                    controllerAs: 'vm'
                }
            }
        })
    ;
});