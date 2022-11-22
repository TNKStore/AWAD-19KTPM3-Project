const userService = require("../user/userService");
//const cartService = require("../cart/cartDetailService");
//const activateService = require("../activate/activateService")
const randomstring = require("randomstring");
const jwt = require('jsonwebtoken');
const passport = require("../../passport");

exports.logout = (req, res, next) => {
    req.logout()
    req.session.unAuthID = randomstring.generate(16);
    res.redirect('/')
}

exports.postLogIn = (req, res, next) => {
    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err) }
        if (!user) { return res.json( { message: info.message }) }
        // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
        const token = jwt.sign({user}, 'secret-jwt-cat',
        {
            expiresIn: 300,
        });
        res.status(200).json({user, token});
    })(req, res, next);
    // Passport store user info in req.user
    // const user = req.user;
}

exports.postSignUp = async (req, res, next) => {
    const {firstName, lastName, email, password, phone, address} = req.body
    if (await userService.findByEmail(email))
        return res.status(403).send({ error: 'Email is already in use'});
    const user = await userService.register(email, firstName, lastName, password, phone, address)
    return res.status(200).send({ error: false, message: 'Sign-up successfully!'});
}