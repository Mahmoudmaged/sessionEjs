const userModel = require('../../../model/collections/User')
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const displaySignIn = (req, res) => {

    res.render('signin', {
        oldInputs: { email: "", password: '' },
        wrongUser: false,
        wrongPassword: false,
        validationError: []
    });
}
const handelSignIn = async(req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            req.session.userID = user._id
            req.session.isLoggedIn = true;

            req.session.email = user.email

            res.redirect("/home")
        } else {
            res.render('signin', { oldInputs: req.body, wrongUser: false, wrongPassword: true, validationError: [] });
        }
    } else {
        res.render('signin', { oldInputs: req.body, wrongUser: true, wrongPassword: false, validationError: [] });
    }

}

module.exports = { displaySignIn, handelSignIn }