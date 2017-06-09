const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Firstname cannot be empty' }
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'Lastname cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { args: true, msg: 'Email already exist' },
      validate: { isEmail: { args: true, msg: 'Use a valid email' } }
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
        Users.belongsTo(models.Role, {
          foreignKey: 'roleId',
          onDelete: 'SET NULL',
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
