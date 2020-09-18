const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBString);

/**
 * The model representing the Ingredients table in the database.
 * @model
 * @property {Number} id - The id of the ingredient.
 * @property {String} Name - The ingredient name.
 */
const Ingredients = sequelize.define('Ingredients', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    Name: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false,
    tableName: 'Ingredients'
});

module.exports = Ingredients;