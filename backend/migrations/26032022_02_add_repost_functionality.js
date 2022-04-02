const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
    await queryInterface.createTable('reposts', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'users', key: 'id' }
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: { model: 'posts', key: 'id' }
        },
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('reposts')
}

module.exports = { up, down }