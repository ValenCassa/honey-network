import { DataTypes, Model } from 'sequelize'
import db from '../utils/db.js'

class Followers extends Model {}

Followers.init({
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
}, {
    sequelize: db.sequelize,
    timestamps: false,
    underscored: true,
    modelName: "follower"
})

export default Followers