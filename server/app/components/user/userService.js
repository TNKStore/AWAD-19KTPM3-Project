const User = require("../../models/user");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.findByEmail = (email) => User.findOne({ where: { email: email } });

exports.findById = (id) => User.findByPk(id);

exports.checkActivate = async (user) => {
    return user.activated;
}

exports.verifyPassword = (password, user) => bcrypt.compare(password, user.password)

exports.register = async (email, firstName, lastName, password, phone, address) => {
    const ActivationString = randomstring.generate();
    console.log(lastName);
    await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashPassword(password),
        phone: phone,
        address: address,
        activated: 0,
        activationString: ActivationString
    })

    const domain = "http://localhost:4000"

    //send activation string
    const msg = {
        to: email, // Change to your recipient
        from: "tdhtrung19@clc.fitus.edu.vn", // Change to your verified sender
        subject: 'Account verification',
        text: 'Thanks for joining us!',
        html: `<h1>Thanks for joining us!</h1>
        <a href="${domain}/activate?email=${email}&activation-string=${ActivationString}">Activate now</a>`
    }
    sgMail
        .send(msg)
        .then(() => {
            console.log(domain)
        })
        .catch((error) => {
            console.error(error)
        })
}

exports.updateInfo = (email, firstName, lastName, address, phone) => User.update({
    firstName: firstName,
    lastName: lastName,
    phone: phone,
    address: address
}, {
    where: {
        email: email
    }
})

exports.updatePassword = (email, pwd) => User.update({
    pwd: hashPassword(pwd)
}, {
    where: {
        email: email
    }
})

exports.updateAddress = (id, address, phone) => User.update({
    address: address,
    phone: phone
}, {
    where: {
        id: id
    }
})