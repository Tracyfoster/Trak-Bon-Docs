module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Role already exist' },
      validate: { notEmpty: { args: true, msg: 'Name cannot be empty' } }
    }
  }, {
    classMethods: {
      associate(models) {
        Role.hasMany(models.Users, {
          foreignKey: 'roleId',
          as: 'Users',
        });
      }
    }
  });
  return Role;
};
