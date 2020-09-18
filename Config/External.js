const email = require('./EmailServer');
const db = require('./JawsDbConnection');
const api = require('./SpoonacularConnection');
const auth = require('./Authenticator');

/**
 * The module provides an easy pathway to access the external functions.
 * @module 
 * @property {Object} email - The Email Server.
 * @property {Object} db - The Database Server.
 * @property {Object} api - The API.
 * @property {Object} auth - The Authenticator.
 */
const externalFunctions = { email, db, api, auth}

module.exports = externalFunctions;