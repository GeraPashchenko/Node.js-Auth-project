const sequelize = require('../sequelizeConnection');
const Sequelize = require('sequelize');

module.exports = sequelize.define('User', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING(250),
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING(250),
        allowNull: false
    },
    email:{
        type: Sequelize.STRING(250),
        allowNull: false,
        isEmail: true
    },
    phone:{
        type: Sequelize.STRING(250),
        allowNull: false,
    },
    token:{
        type: Sequelize.STRING(500),
        allowNull: false
    },
    refreshToken:{
        type: Sequelize.STRING(500),
        allowNull: false
    }
}, {
    timestamps: false
});