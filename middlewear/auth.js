const userModel = require("../model/collections/User")

const auth = async(req, res, next) => {
    if (req.session.userID !== undefined && req.session.userID !== '' &&
        req.session.userID !== null && req.session.isLoggedIn == true) {

        const seessionUser = await userModel.findOne({ _id: req.session.userID })
        if (seessionUser) {
            req.session.seessionUser = seessionUser
            next()
        } else {
            res.redirect("/signin")
        }
    } else {
        res.redirect("/signin")
    }
}


module.exports = { auth }