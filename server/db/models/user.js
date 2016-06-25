module.exports = function (sequelize, DataTypes) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'last_name'
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'created_at'
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'updated_at'
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'deleted_at'
        },
        confirmedAt: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'confirmed_at'
        },
        confirmationToken: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'confirmation_token'
        }
    }, {
        tableName: 'user'
    });
};
