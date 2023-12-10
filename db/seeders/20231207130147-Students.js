'use strict';

const students = [
  {
    firstName: 'Alice',
    lastName: 'Johnson',
  },
  {
    firstName: 'Bob',
    lastName: 'Smith',
  },
  {
    firstName: 'Charlie',
    lastName: 'Davis',
  },
  {
    firstName: 'David',
    lastName: 'Wilson',
  },
  {
    firstName: 'Emily',
    lastName: 'Thompson',
  },
  {
    firstName: 'Ethan',
    lastName: 'Brown',
  },
  {
    firstName: 'Grace',
    lastName: 'Miller',
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
