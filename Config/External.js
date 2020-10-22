const email = require('./EmailServer');
const db = require('./JawsDbConnection');
const api = require('./SpoonacularConnection');
const auth = require('./Authenticator');
const cloud = require('./Cloudinary');

/**
 * The module provides an easy pathway to access the external functions.
 * @module 
 * @property {Object} email - The Email Server.
 * @property {Object} db - The Database Server.
 * @property {Object} api - The API.
 * @property {Object} auth - The Authenticator.
 * @property {Object} cloud - The Cloud Photo Storage
 */
const externalFunctions = { email, db, api, auth, cloud }

module.exports = externalFunctions;