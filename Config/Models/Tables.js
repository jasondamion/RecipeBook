const Users = require('./Users');
const SavedRecipes = require('./SavedRecipes');
const Ingredients = require('./Ingredients');
const CustomRecipes = require('./CustomRecipes');

/**
 * The module provides an one stop, easy access to the models.
 * @module 
 * @property {Object} Users - The Users Model.
 * @property {Object} SavedRecipes - The SavedRecipes Model.
 * @property {Object} CustomRecipes - The CustomRecipes Model.
 * @property {Object} Ingredients - The Ingredients Model.
 */
const Tables = { Users, SavedRecipes, CustomRecipes, Ingredients}

module.exports = Tables;