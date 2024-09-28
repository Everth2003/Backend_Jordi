module.exports = {
    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Roles', [
        { roleName: 'Admin', createdAt: new Date(), updatedAt: new Date() },
        { roleName: 'Vigilante', createdAt: new Date(), updatedAt: new Date() },
        { roleName: 'Estudiante', createdAt: new Date(), updatedAt: new Date() }
      ]);
    },
  
    down: async (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('Roles', null, {});
    }
  };
  