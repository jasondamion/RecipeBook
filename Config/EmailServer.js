const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    host: process.env.Host,
    port: process.env.Port,
    secure: false,
    auth: {
        user: process.env.Email,
        pass: process.env.Pass
    }
});


module.exports = function () {

    function ForgetPassword(firstName, username, suggPassword) {
        const mailOptions = {
            from: process.env.FromEmail, // sender address
            to: process.env.ToEmail, // list of receivers
            subject: 'Forgotten Password', // Subject line
            html: `<h2>${firstName} has forgetten their password and needs it to be reset, Their username is ${username}.</h2><br><h3>They recommend this to be their new password to be: ${suggPassword}</h3>`
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }

    function NewUser(firstName, username) {
        const mailOptions = {
            from: process.env.FromEmail, // sender address
            to: process.env.ToEmail, // list of receivers
            subject: 'New User', // Subject line
            html: `<h2>${firstName} is a new user, Their username is ${username}.</h2>`
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }

    function AddSuggestion(ingredientName, firstName) {
        const mailOptions = {
            from: process.env.FromEmail, // sender address
            to: process.env.ToEmail, // list of receivers
            subject: 'Missing Ingredient', // Subject line
            html: `<h2>${firstName} noticed that an ingredient is missing, The ingredient is ${ingredientName}.</h2>`
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err)
                console.log(err)
            else
                console.log(info);
        });
    }

};
