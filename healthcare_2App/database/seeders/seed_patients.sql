module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('patients', []),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('patients', null, {})
};
