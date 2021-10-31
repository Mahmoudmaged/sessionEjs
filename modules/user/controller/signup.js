const userModel = require('../../../model/collections/User')
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');


const displaySignUp = (req, res) => {
    let oldInputs = req.flash('oldInputs')[0] // only call first time then empty itself
        // console.log(oldInputs);
        // console.log(req.flash('oldInputs')[0]);
    if (oldInputs == undefined) {
        oldInputs = { email: "", password: "", cPassword: '' }
    }
    let validationError = req.flash('validationError')
    if (validationError.length <= 0) {
        validationError: []
    }
    let isExist = req.flash('isExist')[0]
    console.log(isExist);
    if (isExist != true) {
        isExist = false
    }
    let hashError = req.flash('hashError')[0]
    if (hashError != true) {
        hashError = false
    }

    res.render('displaySignUp', {
        isExist,
        oldInputs,
        hashError,
        validationError
    });
}
const handelSignUp = async(req, res, next) => {

    const { email, password, cPassword } = req.body

    const user = await userModel.findOne({ email });
    if (user) {
        console.log("email exist");
        req.flash('oldInputs', req.body)
        req.flash('isExist', true)
        res.redirect("/signup")
    } else {
        bcrypt.hash(password, 8, async(err, hash) => {
            if (err) {
                console.log("hashError");
                req.flash('oldInputs', req.body)
                req.flash('hashError', true)
                res.redirect("/signup")
            } else {
                await userModel.insertMany({ email, password: hash });
                res.redirect("/signin");
            }
        });
    }


}



module.exports = {
    handelSignUp,
    displaySignUp
}