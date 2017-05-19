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
       firstName: 'T-Admin',
       lastName: 'A',
       email: 'admin@admin.com',
       password: bcrypt.hashSync('PWDis123', bcrypt.genSaltSync(10)),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       firstName: 'Mercy',
       lastName: 'J',
       email: 'mercy@mercy.com',
       password: bcrypt.hashSync('mercy123', bcrypt.genSaltSync(10)),
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       firstName: 'John',
       lastName: 'O',
       email: 'john@john.com',
       password: bcrypt.hashSync('johny123', bcrypt.genSaltSync(10)),
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
