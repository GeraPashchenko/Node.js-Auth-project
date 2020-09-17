'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Products', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            price: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            image:{
                type: Sequelize.STRING(250),
                allowNull: false
            },
            userId: {
                type: Sequelize.STRING(500),
                allowNull: false
            },
            created_at: {
                type: 'TIMESTAMP',
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                allowNull: false
            }
        })
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Products');
    }
};
