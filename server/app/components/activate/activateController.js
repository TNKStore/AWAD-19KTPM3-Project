const activateService = require("./activateService");
const userService = require("../user/userService");

exports.activate = async (req, res, next) => {
  const { email } = req.query;
  const activationString = req.query["activationString"];
  console.log(activationString);

  const result = await activateService.activate(email, activationString);

  if (result) {
    return res
      .status(200)
      .send({ error: false, message: "Active sucessfully" });
  } else {
    return res.status(400).send({ error: true, message: "Active failed" });
  }
};
