module.exports = [
    {
        path: "/index",
        method: "GET",
        handler: require('../../controllers/index'),
        config: { auth: false } // 
        //  config: { auth: 'jwt', plugins: {'hapiAuthorization': {roles: ['EMPLOYEE']}} } // 
    }
];