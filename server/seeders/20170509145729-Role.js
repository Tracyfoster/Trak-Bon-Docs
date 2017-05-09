

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
     queryInterface.bulkInsert('Role', [{
       title: 'admin',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'writers',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       title: 'reviewers',
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
