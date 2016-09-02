'use strict';

angular
    .module('app.sign-up')
    .controller('signUpConfirmationController', signUpController);

signUpController.$inject = ['config', 'signUpConfirmationService', '$state'];

function signUpController(config, signUpConfirmationService, $state) {
    const vm = this,
        token = $state.params.token,
        $signUpConfirmation = angular.element('#sign-up-confirmation');

    angular.element(document).ready(function () {
        signUpConfirmationService
            .confirm(token)
            .then(function(data) {
                $signUpConfirmation.find('div.positive.message').show().find('p').text('You have successfully confirmed your e-mail address (' + data.email + ')');
            }).catch(function(response) {
                $signUpConfirmation.find('div.negative.message').show().find('p').text(response.data !== null ? response.data.message : config.errorsMessages.internalError);
            }).then(function() {
                $signUpConfirmation.find('div.icon.message').remove();
        });
    });
}