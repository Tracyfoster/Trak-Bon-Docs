module.exports = (sequelize, DataTypes) => {
  const Documents = sequelize.define('Documents', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Title already exist' },
      validate: { notEmpty: { args: true, msg: 'Title cannot be empty' } }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: { notEmpty: { args: true, msg: 'Content cannot be empty' } }
    },
    access: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'public',
      validate: {
        isIn: {
          args: [['public', 'private', 'writers', 'reviewers']],
          msg: 'Use a valid access type'
        }
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        Documents.belongsTo(models.Users, {
          foreignKey: 'userId',
          onDelete: 'SET NULL',
        });
        Documents.belongsTo(models.Folder, {
          foreignKey: 'folderId',
          onDelete: 'SET NULL',
        });
      }
    }
  });
  return Documents;
};
