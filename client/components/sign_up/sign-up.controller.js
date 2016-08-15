'use strict';

angular
    .module('app.sign-up')
    .controller('signUpController', signUpController);

signUpController.$inject = ['underscore', 'signUpService', 'config'];

function signUpController(_, signUpService, config) {
    var vm = this;

    vm.submitSignUp = submitSignUp;
    vm.showSignUpForm = false;
    vm.formErrors = {};
    vm.showMessage = false;

    function submitSignUp() {
        var $submitButton = angular.element('#sign-up-modal form button[type=submit]');
        $submitButton.addClass('loading');
        signUpService.signUp(vm.user === undefined ? {} : vm.user)
            .then(function(data) {
                vm.showMessage = true;
                vm.messageType = 'success';
                vm.messageTitle = 'Success!';
                vm.messageContent = 'You\'re account has been successfully created. Please check your email <strong>' + data.email + '</strong> and activate your account!';
                vm.user = undefined; /* Clearing form */
            })
            .catch(function(response) {
                if(response.status === 422) {
                    vm.formErrors = response.data.invalid_keys;
                } else {
                    vm.showMessage = true;
                    vm.messageType = 'error';
                    vm.messageTitle = 'Error occurred';
                    vm.messageContent = response.data !== null ? response.data.message : config.errorsMessages.internalError;
                }
            })
            .then(function() {
                $submitButton.removeClass('loading');
            })
        ;
    }
}