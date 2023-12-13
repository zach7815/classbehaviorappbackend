'use strict';

const teachers = [
  {
    first_name: 'John',
    last_name: 'Smith',
    email_address: 'J.S@school.com',
  },
  {
    first_name: 'Jane',
    last_name: 'Doe',
    email_address: 'J.D@school.com',
  },
  {
    first_name: 'Michael',
    last_name: 'Johnson',
    email_address: 'M.J@school.com',
  },
  {
    first_name: 'Emily',
    last_name: 'Williams',
    email_address: 'E.W@school.com',
  },
  {
    first_name: 'David',
    last_name: 'Brown',
    email_address: 'D.B@school.com',
  },
  {
    first_name: 'Sarah',
    last_name: 'Taylor',
    email_address: 'S.T@school.com',
  },
  {
    first_name: 'Daniel',
    last_name: 'Anderson',
    email_address: 'D.A@school.com',
  },
  {
    first_name: 'Jessica',
    last_name: 'Thomas',
    email_address: 'J.T@school.com',
  },
  {
    first_name: 'Andrew',
    last_name: 'Martin',
    email_address: 'A.M@school.com',
  },
  {
    first_name: 'Olivia',
    last_name: 'Clark',
    email_address: 'O.C@school.com',
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
