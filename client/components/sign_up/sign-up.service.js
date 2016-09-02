'use strict';

angular
    .module('app.sign-up')
    .service('signUpService', signUpService)
;

signUpService.$inject = ['$http', 'config'];

function signUpService($http, config) {
    this.signUp = data => {
        return $http.post(config.apiBaseUrl + '/sign-up', data)
            .then(response => {
                return response.data;
            });
    };
}
