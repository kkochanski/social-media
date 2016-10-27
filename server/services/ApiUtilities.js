'use strict';

module.exports = {
    buildSuccessResponse(data, message = 'OK') {
        return {statusCode: 200, message, data};
    }
};