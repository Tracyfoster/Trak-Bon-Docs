
module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Folders', [{
      folderName: 'Personal Stuff',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      folderName: 'Famiz',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      folderName: 'Andela',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      folderName: 'Jokes',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
