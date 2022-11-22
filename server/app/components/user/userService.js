const User = require("../../models/user");
const bcrypt = require("bcrypt");
var randomstring = require("randomstring");

// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey(process.env.SENDGRID_API_KEY)

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

exports.findByEmail = (email) => User.findOne({ where: { email: email } })

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

    //send activation string
    // const msg = {
    //     to: email, // Change to your recipient
    //     from: process.env.EMAIL_SENDER, // Change to your verified sender
    //     subject: 'TNKStore account verification',
    //     text: 'Thank you for choosing our store!',
    //     html: `<h1>Thank you for choosing our store!</h1>
    //     <a href="${process.env.DOMAIN_NAME}/activate?email=${email}&activation-string=${ActivationString}">Activate now</a>`
    // }
    // sgMail
    //     .send(msg)
    //     .then(() => {
            
    //         console.log(process.env.DOMAIN_NAME)
    //     })
    //     .catch((error) => {
    //         console.error(error)
    //     })
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