import { DataTypes, Model, UUID } from 'sequelize'
import db from '../utils/db.js'
import crypto from 'crypto'

class User extends Model {}

User.init({
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
}, {
    sequelize: db.sequelize,
    timestamps: false,
    modelName: 'user'
})

export default User
