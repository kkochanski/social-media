/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('groupHasUser', {
      group_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          references: {
              model: 'group',
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
      },
      group_privilege_id: {
          type: DataTypes.INTEGER(11),
          allowNull: false,
          primaryKey: true,
          references: {
              model: 'group_privilege',
              key: 'id'
          }
      },
      created_at: {
          type: DataTypes.DATE,
          allowNull: false
      }
  }, {
    tableName: 'group_has_user'
  });
};
