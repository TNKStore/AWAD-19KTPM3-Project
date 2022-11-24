const passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
const userService = require("../components/user/userService");

const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
// passport-jwt will look for Authorization header with bearer scheme.
// Client must use request header as below to send JWT token for backend to verify:
// Authorization: bearer <jwt-token-here>
opts.jwtFromRequest = ExtractJwt.fromHeader("x-access-token");
// Use the same secret used to sign the jwt token in login api
opts.secretOrKey = "secret-jwt-cat";


passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async function (username, password, done) {
        const user = await userService.findByEmail(username);
        if (!user) {
            return done(null, false, { message: 'Incorrect username.'});
        }
        // const isActivated = await userService.checkActivate(user);
        // if (!isActivated) {
        //     return done(null, false, { message: 'Active needed.' });
        // }
        const isValid = await userService.verifyPassword(password, user);
        if (!isValid) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user)
    }
));

passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload.user.email);
    const user = userService.findByEmail(jwt_payload.user.email);
    if (!user) {
        return done(null, false, { message: 'Incorrect username.'});
    }
    return done(null, user)
}
));

passport.serializeUser(function (user, done) {
    done(null, {
        email: user.email,
        id: user.id
    });
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport