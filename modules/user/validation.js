const { body } = require('express-validator')


const signupValidator = [
    body('email').isEmail().withMessage("in-valid email"),
    body('password').isStrongPassword().withMessage("in-valid password"),
    body('cPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Password confirmation does not match password');
        }

        // Indicates the success of this synchronous custom validator
        return true;
    }),
]



module.exports = {
    signupValidator
}