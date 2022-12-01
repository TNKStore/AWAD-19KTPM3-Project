const User = require("../../models/user");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

function hashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

exports.findByEmail = (email) =>
  User.findOne({
    raw: true,
    where: { email: email },
  });

exports.findById = (id) => User.findByPk(id);

exports.checkActivate = async (user) => {
  return user.activated;
};

exports.verifyPassword = (password, user) =>
  bcrypt.compare(password, user.password);

exports.register = async (
  email,
  firstName,
  lastName,
  password,
  phone,
  address
) => {
  const ActivationString = randomstring.generate();
  await User.create({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password ? hashPassword(password) : null,
    phone: phone,
    address: address,
    activated: 0,
    activationString: ActivationString,
  });

  const domain = process.env.DOMAIN;

  //send activation string
  const msg = {
    to: email, // Change to your recipient
    from: "ptvkhue19@clc.fitus.edu.vn", // Change to your verified sender
    subject: "Account verification",
    text: "Thanks for joining us!",
    html: `<h1>Thanks for joining us!</h1>
        <a href="${domain}/activate?email=${email}&activationString=${ActivationString}">Activate now</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log(domain);
    })
    .catch((error) => {
      console.error(error);
    });
};

exports.updateInfo = (email, firstName, lastName, address, phone) =>
  User.update(
    {
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      address: address,
    },
    {
      where: {
        email: email,
      },
    }
  );

exports.updatePassword = (email, pwd) =>
  User.update(
    {
      password: hashPassword(pwd),
    },
    {
      where: {
        email: email,
      },
    }
  );

exports.updateAddress = (id, address, phone) =>
  User.update(
    {
      address: address,
      phone: phone,
    },
    {
      where: {
        id: id,
      },
    }
  );
