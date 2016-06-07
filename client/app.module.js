'use strict';

angular
    .module('app', [
        'ngMessages',
        'app.sign-up',
        'app.profile',
        'app.notifications',
        'app.messages',
        'app.log-in',
        'app.groups',
        'app.friends',
        'app.dashboard',
        'app.account',
        'app.routes',
        'app.services',
        'app.directives',
        'app.factories',
        'app.menu'
    ])
    .value('config', {
    'appName' : 'My Awesome App',
    'apiBaseUrl' : 'http://localhost:8000'
    })
;