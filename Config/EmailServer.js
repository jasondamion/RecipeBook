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


var emailFunctions = {

    /**
     * When the password is forgotten, this function is called to email the admin (me) to change it.
     * @function
     * @param {String} firstName - The first name of the user.
     * @param {String} username - The username of the user.
     * @param {String} suggPassword - The suggested password.
     */
    ForgetPassword(firstName, username, suggPassword) {
        return new Promise(function (resolve) {
            const mailOptions = {
                from: process.env.FromEmail, // sender address
                to: process.env.ToEmail, // list of receivers
                subject: 'Forgotten Password', // Subject line
                html: `<h2>${firstName} has forgetten their password and needs it to be reset, Their username is ${username}.</h2><br><h3>They recommend this to be their new password to be: ${suggPassword}</h3>`
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                    resolve({ Result: "Error", Message: "Error sending mail: " + err })
                }
                else {
                    console.log(info);
                    resolve({ Result: "Success", Message: "Email sent" })
                }
            });
        })
    },

    /**
     * When a new user is added, this notifies me of them being added.
     * @function
     * @param {String} firstName - The first name of the user.
     * @param {String} username - The username of the user.
     */
    NewUser(firstName, username) {
        const mailOptions = {
            from: process.env.FromEmail, // sender address
            to: process.env.ToEmail, // list of receivers
            subject: 'New User', // Subject line
            html: `<h2>${firstName} is a new user, Their username is ${username}.</h2>`
        }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.log(err)
            }
            else {
                console.log(info);
            }
        });
    },

    /**
     * When a user find a ingredient that needs to be added.
     * @function
     * @param {String} ingredientName - The ingredient missing.
     * @param {String} firstName - The first name of the user.
     */
    AddSuggestion(ingredientName, firstName, username) {
        return new Promise(function (resolve) {
            const mailOptions = {
                from: process.env.FromEmail, // sender address
                to: process.env.ToEmail, // list of receivers
                subject: 'Missing Ingredient', // Subject line
                html: `<h2>${firstName}, username being ${username}, noticed that an ingredient is missing, The ingredient is ${ingredientName}.</h2>`
            }

            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err)
                    resolve({ Result: "Error", Message: "Error sending mail: " + err })
                }
                else {
                    console.log(info);
                    resolve({ Result: "Success", Message: "Email sent" })
                }
            });
        })
    }
};

module.exports = emailFunctions;

// async function tester(){
//     var test = await emailFunctions.AddSuggestion("Test", "Jason", "jasondamion20");
//     console.log(test);
// }

// tester();