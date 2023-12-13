'use strict';

const classes = [
  {
    class_name: '5A_History',
    subject_id: 10,
    grade: 5,
  },

  {
    class_name: '2A_Maths',
    subject_id: 1,
    grade: 2,
  },
  {
    class_name: 'Maths',
    subject_id: 1,
    grade: 3,
  },
  {
    class_name: '3A_Geography',
    subject_id: 9,
    grade: 3,
  },
  {
    class_name: '6A_Health_Studies',
    subject_id: 30,
    grade: 6,
  },

  {
    class_name: '4A_Art',
    subject_id: 6,
    grade: 4,
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'classes',
      classes.map((classData) => ({
        ...classData,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('classes', null, {});
  },
};
