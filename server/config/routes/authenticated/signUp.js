
module.exports = [
    {
        path: '/sign-up',
        method: 'POST',
        handler: require('../../../controllers/signUp').signUp,
        config: {
            auth: false
        }
    },
    {
        path: '/sign-up/confirmation/{token}',
        method: 'GET',
        handler: require('../../../controllers/signUp').signUpConfirmation,
        config: {
            auth: false
        }
    }
];