module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    folderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      // Associations defined here
      associate: (models) => {
        Folder.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
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
