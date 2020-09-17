const sequelize = require('../sequelizeConnection');
const Sequelize = require('sequelize');

module.exports = sequelize.define('BlockedToken', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    token:{
        type: Sequelize.STRING(500),
        allowNull: false
    }
}, {
    timestamps: false
});