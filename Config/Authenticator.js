var hash = require('object-hash');
var jwt = require("jsonwebtoken");
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
var secret = process.env.SECRET;
var db = require('./JawsDbConnection');

var securityFunctions = {

     /**
     * Hashes the password.
     * @function
     * @param {String} password - The plain password of the user.
     */
     hasher(password) {
        return hash({ Password: password })
    },
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

         /**
     * Gets the Id from the token.
     * @function
     * @param {String} token - The token given by the user.
     */
    getIdFromToken(token) {
        try {
            var decoded = jwt.verify(token, secret);
        }
        catch{
            return { Result: "Error", Message: "Invalid User" }
        }
        return decoded.UserId
    },

             /**
     * Checks if token is for a valid user.
     * @function
     * @param {String} token - The token given by the user.
     */
    async isValidUser(token) {
        try {
            var decoded = jwt.verify(token, secret);
        }
        catch{
            return false;
        }

        var validUser = await db.isUser(decoded.Username, decoded.Password)
        return validUser;
    }
};

module.exports = securityFunctions;