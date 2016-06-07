'use strict';

angular.module('app.services')
    .service('arrayHelperService', function() {

        this.range = function (from, to) {
            var array=[];
            while(from--) {
                array[from]=from+to;
            }

            return array;
        }
    });
;