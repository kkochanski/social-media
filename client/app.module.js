'use strict';

angular
    .module('app', [
    'app.routes',
    'app.services',
    'app.directives',
    'app.factories',
    'ngMessages'
])
    .value('config', {
    'appName' : 'My Awesome App',
    'apiBaseUrl' : 'http://localhost:8000'
})
;