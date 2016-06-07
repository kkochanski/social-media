'use strict';

angular
    .module('app.sign-up')
    .service('signUpService', signUpService)
;

signUpService.$inject = ['$http', 'config'];

function signUpService($http, config) {
    this.signUp = function(data) {
        return $http.post(config.apiBaseUrl + '/sign-up', data)
            .then(function(response) {
                return response.data;
            });
    };
}
