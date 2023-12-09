'use strict';

const teachingRole = [
  {
    roleName: 'Teacher',
  },
  {
    roleName: 'Teaching Assitant',
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'teachingRoles',
      teachingRole.map((role) => ({
        ...role,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('teacherRoles', null, {});
  },
};
