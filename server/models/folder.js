module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Role already exist' },
      validate: { notEmpty: { args: true, msg: 'Name cannot be empty' } }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Folder.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'SET NULL',
        });
        Folder.hasMany(models.Documents, {
          foreignKey: 'folderId',
          as: 'folderDocuments',
        });
      }
    }
  });
  return Folder;
};
