const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
    await queryInterface.createTable('followers', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        },
        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
        }
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('followers')
}

module.exports = { up, down }