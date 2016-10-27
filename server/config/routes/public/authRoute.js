module.exports = [
    {
        path: '/login',
        method: 'POST',
        handler: require('../../../controllers/authController').login,
        config: {
            auth: false
        }
    },
    {
        path: '/logout',
        method: 'GET',
        handler: require('../../../controllers/authController').logout,
        config: {
            auth: 'jwt'
        }
    }
];