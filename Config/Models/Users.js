const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') })
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(process.env.DBString);

const Users = sequelize.define('Users', {
    // Model attributes are defined here
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    FirstName: {
        type: DataTypes.STRING,
    },
    Username: {
        type: DataTypes.STRING
    },
    HashPass: {
        type: DataTypes.STRING
    }
}, {
    timestamps: false,
    tableName: 'Users'
});

module.exports = Users;