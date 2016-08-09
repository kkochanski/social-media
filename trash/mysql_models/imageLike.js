/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('imageLike', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        current_score: {
            type: DataTypes.STRING,
            allowNull: true
        },
        undone_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        image_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user_image',
                key: 'id'
            }
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    }, {
        tableName: 'image_like'
    });
};
