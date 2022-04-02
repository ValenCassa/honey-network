import { Model, DataTypes } from 'sequelize'
import db from '../utils/db.js'

class Fav extends Model {}

Fav.init({
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
}, {
    sequelize: db.sequelize,
    timestamps: false,
    underscored: true,
    modelName: 'fav'
})

export default Fav