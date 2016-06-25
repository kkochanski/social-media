'use strict';

angular
    .module('app.sign-up')
    .controller('signUpController', signUpController);

signUpController.$inject = ['underscore', 'signUpService'];

function signUpController(_, signUpService) {
    var vm = this;

    vm.submitSignUp = submitSignUp;
    vm.showSignUpForm = false;
    vm.formErrors = {};

    /* Form options */
    vm.birthday = {};
    vm.birthday.availableDays = _.range(1, 32);
    vm.birthday.availableMonths = _.range(1, 13);
    vm.birthday.availableYears = _.range(2005, 1900, -1);

    function submitSignUp() {
        var $submitButton = angular.element('#sign-up-modal form button[type=submit]');
        $submitButton.addClass('loading');
        signUpService.signUp(vm.user === undefined ? {} : vm.user)
            .then(function(data) {
                console.log(data);
            })
            .catch(function(response) {
                console.log(response);
                if(response.status === 422) {
                    vm.formErrors = response.data.invalid_keys;
                }
            })
            .then(function() {
                $submitButton.removeClass('loading');
            })
        ;
    }
}