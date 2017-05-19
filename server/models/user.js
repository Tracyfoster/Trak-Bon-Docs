const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations defined here
        Users.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'CASCADE',
        });
        Users.hasMany(models.Folder, {
          foreignKey: 'userId',
          as: 'userFolders',
        });
        Users.hasMany(models.Documents, {
          foreignKey: 'userId',
          as: 'userDocuments',
        });
      }
    },
    instanceMethods: {
      /**
       * Compare plain password to user's hashed password
       * @param {String} password
       * @returns {Boolean} - true if password is correct, otherwise false
       */
      verifyPassword(password) {
        return bcrypt.compareSync(password, this.password);
      },

      /**
       * Hash user's password
       * @method
       * @returns {Void} no return
       */
      hashPassword() {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
      }
    },
    hooks: {
      beforeCreate(user) {
        user.hashPassword();
      },
      beforeUpdate(user) {
        if (user.password) {
          user.hashPassword();
        }
      }
    }
  });
  return Users;
};
