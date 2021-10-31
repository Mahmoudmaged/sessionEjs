const { validationResult } = require('express-validator')



const handelValidation = (redirectUrl) => {
    return (req, res, next) => {
        const error = validationResult(req);
        if (error.isEmpty()) {
            next()
        } else {
            console.log("validation error");
            req.flash('oldInputs', req.body)
            req.flash('validationError', error.array())
            res.redirect(redirectUrl)
        }
    }
}


module.exports = { handelValidation }