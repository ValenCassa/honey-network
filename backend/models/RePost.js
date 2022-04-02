import { Model, DataTypes } from 'sequelize'
import db from '../utils/db.js'

class RePost extends Model {}

RePost.init({
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
    reposted_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: db.sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'repost'
})

export default RePost