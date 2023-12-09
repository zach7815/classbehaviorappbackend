'use strict';

const teachers = [
  {
    firstName: 'John',
    lastName: 'Smith',
    emailAddress: 'J.S@school.com',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    emailAddress: 'J.D@school.com',
  },
  {
    firstName: 'Michael',
    lastName: 'Johnson',
    emailAddress: 'M.J@school.com',
  },
  {
    firstName: 'Emily',
    lastName: 'Williams',
    emailAddress: 'E.W@school.com',
  },
  {
    firstName: 'David',
    lastName: 'Brown',
    emailAddress: 'D.B@school.com',
  },
  {
    firstName: 'Sarah',
    lastName: 'Taylor',
    emailAddress: 'S.T@school.com',
  },
  {
    firstName: 'Daniel',
    lastName: 'Anderson',
    emailAddress: 'D.A@school.com',
  },
  {
    firstName: 'Jessica',
    lastName: 'Thomas',
    emailAddress: 'J.T@school.com',
  },
  {
    firstName: 'Andrew',
    lastName: 'Martin',
    emailAddress: 'A.M@school.com',
  },
  {
    firstName: 'Olivia',
    lastName: 'Clark',
    emailAddress: 'O.C@school.com',
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'teachers',
      teachers.map((teacher) => ({
        ...teacher,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('teachers', null, {});
  },
};
