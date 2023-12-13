'use strict';

const students = [
  {
    first_name: 'Alice',
    last_name: 'Johnson',
  },
  {
    first_name: 'Bob',
    last_name: 'Smith',
  },
  {
    first_name: 'Charlie',
    last_name: 'Davis',
  },
  {
    first_name: 'David',
    last_name: 'Wilson',
  },
  {
    first_name: 'Emily',
    last_name: 'Thompson',
  },
  {
    first_name: 'Ethan',
    last_name: 'Brown',
  },
  {
    first_name: 'Grace',
    last_name: 'Miller',
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'students',
      students.map((student) => ({
        ...student,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('students', null, {});
  },
};
