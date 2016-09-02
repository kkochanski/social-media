
module.exports = [
    {
        path: '/sign-up',
        method: 'POST',
        handler: require('../../../controllers/signUpController').signUp,
        config: {
            auth: false
        }
    },
    {
        path: '/sign-up/confirmation',
        method: 'POST',
        handler: require('../../../controllers/signUpController').signUpConfirmation,
        config: {
            auth: false
        }
    }
];