const userService = require('./userService');
const {result} = require('lodash');
const createError = require("http-errors");

const bcrypt = require('bcrypt');
const saltRounds = 10

exports.register = async (email, firstName, lastName, password, phone, address) => {
    console.log(lastName);
    const ActivationString = randomstring.generate();

    await User.create({
        email: email,
        firstName: firstName,
        lastName: lastName,
        pwd: hashPassword(password),
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