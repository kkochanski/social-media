module.exports = function(request, reply) {

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