// Umzug uses commonJS imports, that's why I had to put a package.json in this folder.

const { DataTypes } = require('sequelize')

async function up({ context: queryInterface }) {
    await queryInterface.createTable('posts', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
        },
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE
    })

    await queryInterface.createTable('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 15],
                notEmpty: true,
                is: /^@/
            }
        },
        passwordHash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        admin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    })

    await queryInterface.addColumn('posts', 'user_id', {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' }
    })
}


async function down({ context: queryInterface }) {
    await queryInterface.dropTable('posts')
    await queryInterface.dropTable('users')
}

module.exports = { up, down }