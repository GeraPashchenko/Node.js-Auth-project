const Sequelize = require("sequelize");

const sequelize = new Sequelize("announcements", "root", "pass",{
    dialect: "mysql",
    host: "localhost"
});

module.exports = sequelize;