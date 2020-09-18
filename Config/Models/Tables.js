const Users = require('./Users');
const SavedRecipes = require('./SavedRecipes');
const Ingredients = require('./Ingredients');

/**
 * The module provides an one stop, easy access to the models.
 * @module 
 * @property {Object} Users - The Users Model.
 * @property {Object} SavedRecipes - The SavedRecipes Model.
 * @property {Object} Ingredients - The Ingredients Model.
 */
const Tables = { Users, SavedRecipes, Ingredients}

module.exports = Tables;