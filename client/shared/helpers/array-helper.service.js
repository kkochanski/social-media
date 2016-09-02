'use strict';

angular.module('app.services')
    .service('arrayHelperService', () => {

        this.range = (from, to) => {
            var array=[];
            while(from--) {
                array[from]=from+to;
            }

            return array;
        }
    });
;