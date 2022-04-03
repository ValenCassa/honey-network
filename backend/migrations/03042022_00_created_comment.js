const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
    await queryInterface.addColumn('posts', 'reply_id', {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: 'posts', key: 'id' }
    })
}

async function down({ context: queryInterface }) {
    await queryInterface.removeColumn('posts', 'reply_id')
}

module.exports = { up, down }