'use strict';

const teachingRole = [
  {
    role_name: 'Teacher',
  },
  {
    role_name: 'Teaching Assistant',
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'teaching_roles',
      teachingRole.map((role) => ({
        ...role,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('teaching_roles', null, {});
  },
};
