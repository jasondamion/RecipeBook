const email = require('./EmailServer');
const db = require('./JawsDbConnection');
const api = require('./SpoonacularConnection');

/**
 * The module provides an easy pathway to access the external functions.
 * @module 
 * @property {Object} email - The Email Server.
 * @property {Object} db - The Database Server.
 * @property {Object} api - The API.
 */
const externalFunctions = { email, db, api}

module.exports = externalFunctions;