const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBString);

/**
 * The model representing the SavedRecipes table in the database.
 * @model
 * @property {Number} id - The id of the recipe.
 * @property {Number} UserId - The username of the user.
 * @property {Number} RecipeId - The id of the recipe from the API.
 * @property {String} RecipeName - The name of the recipe from the API.
 * @property {String} RecipeSummary - The summary of the recipe from the API.
 * @property {String} RecipeComments - The comment of the recipe added by the user.
 */
const SavedRecipes = sequelize.define('SavedRecipes', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RecipeId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    RecipeName: {
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
    tableName: 'SavedRecipes'
});

module.exports = SavedRecipes;