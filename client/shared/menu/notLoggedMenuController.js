'use strict';

angular
    .module('app')
    .controller('notLoggedMenuController', notLoggedMenuController);

notLoggedMenuController.$inject = ['$scope'];

function notLoggedMenuController($scope) {
    var vm = this;

    /* General vars and functions */
    vm.openLogInModal = openLogInModal;
    vm.openLogInModalFromSignUpModal = openLogInModalFromSignUpModal;
    vm.openSignUpModal = openSignUpModal;
    vm.openSignUpModalFromLogInModal = openSignUpModalFromLogInModal;
    vm.submitSignUp = submitSignUp;
    vm.showSignUpForm = false;

    /* Form options */
    vm.birthday = {};
    vm.birthday.availableDays = _.range(1, 32);
    vm.birthday.availableMonths = _.range(1, 13);
    vm.birthday.availableYears = _.range(2012, 1900, -1);

    function openLogInModal() {
        angular.element('#log-in-modal').modal('show');
    }
    
    function openLogInModalFromSignUpModal() {
        openLogInModal();
        angular.element('#sign-up-modal').modal('hide');
    }
    
    function openSignUpModal() {
        angular.element('#sign-up-modal')
            .modal({
                onHidden : function() {
                    vm.showSignUpForm = false;
                }
            })
            .modal('show')
        ;
    }

    function openSignUpModalFromLogInModal() {
        openSignUpModal();
        angular.element('#log-in-modal').modal('hide');
    }
    
    function submitSignUp() {
        // console.log(vm.signUpForm);
        // console.log(vm.signUpForm.$valid);
        return false;
    }
}