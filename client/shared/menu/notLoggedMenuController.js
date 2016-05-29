'use strict';


angular
    .module('app')
    .controller('notLoggedMenuController', notLoggedMenuController);

notLoggedMenuController.$inject = [];

function notLoggedMenuController() {
    var vm = this;
    
    vm.openLogInModal = openLogInModal;
    vm.openLogInModalFromSignUpModal = openLogInModalFromSignUpModal;
    vm.openSignUpModal = openSignUpModal;
    vm.openSignUpModalFromLogInModal = openSignUpModalFromLogInModal;
    vm.showSignUpForm = false;

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
}