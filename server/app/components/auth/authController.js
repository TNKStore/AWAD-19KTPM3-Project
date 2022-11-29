const userService = require("../user/userService");
//const cartService = require("../cart/cartDetailService");
//const activateService = require("../activate/activateService")
const randomstring = require("randomstring");
const jwt = require("jsonwebtoken");
const passport = require("../../passport");
const { OAuth2Client } = require("google-auth-library");

exports.logout = (req, res, next) => {
  req.logout();
};

exports.postLogIn = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, async function (err) {
      if (err) {
        return next(err);
      }
      // Generate jwt token for user, you can also add more data to sign, such as: role, birthday...
      const token = jwt.sign({ user }, "secret-jwt-cat", {
        expiresIn: 300,
      });
      return res.status(200).json({ user, token });
    });
  })(req, res, next);
  // Passport store user info in req.user
  // const user = req.user;
};

exports.postSignUp = async (req, res, next) => {
  const { firstName, lastName, email, password, phone, address } = req.body;
  if (await userService.findByEmail(email))
    return res.status(400).send({ error: "Email is already in use" });
  const user = await userService.register(
    email,
    firstName,
    lastName,
    password,
    phone,
    address
  );
  return res
    .status(200)
    .send({ error: false, message: "Sign-up successfully!" });
};

/**
 *  This function is used verify a google account
 */
const GOOGLE_CLIENT_ID =
  "1013752400475-578slktk1o1tu3k8t47eb6raqc84o9e9.apps.googleusercontent.com";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    return { payload: ticket.getPayload() };
  } catch (error) {
    return { error: "Invalid user detected. Please try again" };
  }
}

exports.postLogInGoogle = async (req, res, next) => {
  try {
    if (req.body.credential) {
      const verificationResponse = await verifyGoogleToken(req.body.credential);
      if (verificationResponse.error) {
        return res.status(400).json({
          message: verificationResponse.error,
        });
      }

      const profile = verificationResponse?.payload;
      let user = await userService.findByEmail(profile?.email);
      if (!user) {
        user = await userService.register(
          profile?.email,
          profile?.given_name,
          profile?.family_name,
          null,
          null,
          null
        );
      }
      const token = jwt.sign({ user }, process.env.JWT_SECRET, {
        expiresIn: 300,
      });

      return res.status(200).json({ user, token });
    }
  } catch (error) {
    res.status(500).json({
      message: error?.message || error,
    });
  }
};
