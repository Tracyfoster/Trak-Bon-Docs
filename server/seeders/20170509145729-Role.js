

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
     queryInterface.bulkInsert('Roles', [{
       roleName: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       roleName: 'reviewers',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       roleName: 'writers',
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
