'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
       await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: Sequelize.STRING(250),
                allowNull: false,
                unique: true,
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
            password: {
                type: Sequelize.STRING(250),
                allowNull: false
            },
           token:{
               type: Sequelize.STRING(500),
               allowNull: false
           },
           refreshToken:{
               type: Sequelize.STRING(500),
               allowNull: false
           }
        })
    },

    down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('Users');
    }
};
