const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBString);

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