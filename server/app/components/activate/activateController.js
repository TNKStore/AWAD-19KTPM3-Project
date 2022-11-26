const activateService = require("./activateService");
const userService = require("../user/userService");

exports.activate = async (req, res, next) => {
  const { email } = req.query;
  const activationString = req.query["activationString"];
  console.log(activationString);
  console.log(email);
  const result = await activateService.activate(email, activationString);

  if (result) {
    const user = await userService.findByEmail(email);
    req.login(user, async function (err) {
      if (err) {
        return next(err);
      }
      // await cartService.updateUserCart(req.user.id, req.session.unAuthID);
      return res
        .status(200)
        .send({ error: false, message: "Active sucessfully" });
    });
  } else {
    return res.status(404).send({ error: true, message: "Active failed" });
  }
};
