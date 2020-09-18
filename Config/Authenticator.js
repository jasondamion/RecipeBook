var hash = require('object-hash');
var jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
var secret = process.env.SECRET;
var db = require('./JawsDbConnection');

function hasher(password) {
    return hash({ Password: password })
}

var securityFunctions = {

    
      /**
     * Generates a JWT token with the userId, password, and username.
     * @function
     * @param {Number} userId - The username of the user.
     * @param {String} username - The username of the user.
     * @param {String} password - The plain password of the user.
     */
    genJWTCode(userId, username, password) {
        var hashpass = hasher(password);
        var token = jwt.sign({
            "UserId": userId,
            "Username": username,
            "Password": hashpass
        }, secret)
        return token;
    },

    getIdFromToken(token) {
        try {
            var decoded = jwt.verify(token, secret);
        }
        catch{
            return { Result: "Error", Message: "Invalid User" }
        }
        return decoded.UserId
    },

    async isUser(token) {
        try {
            var decoded = jwt.verify(token, secret);
        }
        catch{
            return { Result: "Error", Message: "Invalid User" }
        }

        var validUser = await db.isUser(decoded.Username, decoded.Password)
        return validUser;
    }
};

module.exports = securityFunctions;