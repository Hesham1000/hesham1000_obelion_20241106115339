module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert('doctors', []),
  down: (queryInterface, Sequelize) =>
    queryInterface.bulkDelete('doctors', null, {})
};
