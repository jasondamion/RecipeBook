const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBString);

/**
 * The model representing the CustomRecipes table in the database.
 * @model
 * @property {Number} id - The id of the recipe.
 * @property {Number} UserId - The username of the user.
 * @property {String} RecipeName - The name of the custom recipe.
 * @property {String} RecipeIngredients - The ingredients of the custom recipe.
 * @property {String} RecipeInstructions - The instructions of the custom recipe.
 * @property {String} RecipeSummary - The summary of the custom recipe.
 * @property {String} RecipeComments - The comments of the custom recipe.
 */
const CustomRecipes = sequelize.define('CustomRecipes', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RecipeName: {
        type: DataTypes.STRING,
    },
    RecipeIngredients: {
        type: DataTypes.STRING,
    },
    RecipeInstructions: {
        type: DataTypes.STRING,
    },
    RecipeSummary: {
        type: DataTypes.STRING
    },
    RecipeComments: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'CustomRecipes'
});

module.exports = CustomRecipes;