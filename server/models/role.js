module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, {
    classMethods: {
      associate(models) {
        // Associations defined here
        Role.hasMany(models.Users, {
          foreignKey: 'roleId',
          as: 'Users',
        });
      }
    }
  });
  return Role;
};
