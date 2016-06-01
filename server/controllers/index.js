module.exports = function(request, reply) {
            // $scope.$watchGroup(['error'],function(newValues, oldValues, scope) {
            //     var fieldContainer = element.parent('div.field');
            //     // console.log(newValues, oldValues);
            //     if(newValues[1] === true) {
            //         if(_.isEmpty(newValues[0])) {
            //             element.parent('div.field').removeClass('error');
            //         } else {
            //             element.parent('div.field').addClass('error');
            //         }
            //     }
            // },  true);

            // console.log($scope.statement);
            // console.log($scope.error);


    // var models = request.server.plugins['hapi-sequelize'].db.sequelize.models;
    //
    // models.User.create({ first_name: 'test', last_name: 'haaa', email: 'gohanzo@o2.pl', password: 'eeee', confirmation_token: 'tak' });
    //





    //
    // var JWT   = require('jsonwebtoken');
    // var obj   = { id:123,"name":"Charlie" }; // object/info you want to sign
    // var token = JWT.sign(obj, '123123123');


    return reply('Hello from index! ');
};