const { auth } = require('../../middlewear/auth');
const { handelValidation } = require('../../middlewear/handelvalidation');
const { displaySignIn, handelSignIn } = require('./controller/signin');
const { handelSignUp, displaySignUp } = require('./controller/signup');
const { signupValidator } = require('./validation');

const router = require('express').Router();



router.get("/signup", displaySignUp)

router.post("/signup", signupValidator, handelValidation('/signup'), handelSignUp)



router.get("/signin", displaySignIn)


router.post("/signin", signupValidator[0, 1], handelSignIn)




router.get("/home", auth, (req, res) => {
    console.log(req.session.email);
    res.render('home', { userData: req.session.seessionUser })
})


router.get("/logout", auth, (req, res) => {

    req.session.destroy()
    res.redirect('/signin')
})




module.exports = router