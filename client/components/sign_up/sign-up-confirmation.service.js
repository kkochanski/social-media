'use strict';

angular
    .module('app.sign-up')
    .service('signUpConfirmationService', signUpConfirmationService)
;

signUpConfirmationService.$inject = ['$http', 'config'];

function signUpConfirmationService($http, config) {
    this.confirm = function(token) {
        return $http.post(config.apiBaseUrl + '/sign-up/confirmation', {'token': token})
            .then(function(response) {
                return response.data;
            });
    };
}
