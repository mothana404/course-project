'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const now = new Date();
    await queryInterface.bulkInsert('Roles', [{
      role_name: 'student',
      createdAt: now,
      updatedAt: now
    }]);
    await queryInterface.bulkInsert('Roles', [{
      role_name: 'teacher',
      createdAt: now,
      updatedAt: now
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', { role_name: 'student' });
    await queryInterface.bulkDelete('Roles', { role_name: 'teacher' });
  }
};
