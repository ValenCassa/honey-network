const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
    await queryInterface.createTable('favs', {
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
        faved_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    })

    await queryInterface.addColumn('reposts', 'reposted_at', {
        type: DataTypes.DATE,
        allowNull: false
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.dropTable('favs')
    await queryInterface.removeColumn('reposts', 'reposted_at')
}

module.exports = { up, down }