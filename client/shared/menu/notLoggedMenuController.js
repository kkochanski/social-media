'use strict';

angular
    .module('app')
    .controller('notLoggedMenuController', notLoggedMenuController);

notLoggedMenuController.$inject = ['$scope'];

function notLoggedMenuController($scope) {
    /* General vars and functions */
    $scope.openLogInModal = openLogInModal;
    $scope.openLogInModalFromSignUpModal = openLogInModalFromSignUpModal;
    $scope.openSignUpModal = openSignUpModal;
    $scope.openSignUpModalFromLogInModal = openSignUpModalFromLogInModal;
    
    function openLogInModal() {
        angular.element('#log-in-modal').modal('show');
    }
    
    function openLogInModalFromSignUpModal() {
        openLogInModal();
        angular.element('#sign-up-modal').modal('hide');
    }
    
    function openSignUpModal() {
        angular.element('#sign-up-modal')
            .modal('show')
        ;
    }

    function openSignUpModalFromLogInModal() {
        openSignUpModal();
        angular.element('#log-in-modal').modal('hide');
    }
}