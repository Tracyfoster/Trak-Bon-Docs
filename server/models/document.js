module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['public', 'private', 'writers', 'reviewers']]
      }
    },
  }, {
    classMethods: {
      // Associations defined here
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'CASCADE',
        });
        Documents.belongsTo(models.Folder, {
          foreignKey: 'folderId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return Documents;
};
