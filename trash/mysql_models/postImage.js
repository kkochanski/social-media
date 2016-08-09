/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('postImage', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        tableName: 'post_image'
    });
};
