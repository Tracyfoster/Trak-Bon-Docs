const bcrypt = require('bcrypt-nodejs');

module.exports = {
  up: (queryInterface, Sequelize) => 
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
     queryInterface.bulkInsert('Users', [{
       name: 'T-Admin',
       email: 'admin@admin.com',
       password: bcrypt.hashSync('PWDis123', bcrypt.genSaltSync(10)),
       roleId: 1,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Mercy J',
       email: 'mercy@mercy.com',
       password: bcrypt.hashSync('mercy123', bcrypt.genSaltSync(10)),
       roleId: 2,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'John O',
       email: 'john@john.com',
       password: bcrypt.hashSync('johny123', bcrypt.genSaltSync(10)),
       roleId: 3,
       createdAt: new Date(),
       updatedAt: new Date()
     },
     ], {}),

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
