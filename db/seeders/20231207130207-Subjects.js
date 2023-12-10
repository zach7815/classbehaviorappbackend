'use strict';

const subjects = [
  { subjectName: 'Mathematics' },
  { subjectName: 'English Language' },
  { subjectName: 'Science' },
  { subjectName: 'Social Studies' },
  { subjectName: 'Physical Education' },
  { subjectName: 'Art' },
  { subjectName: 'Music' },
  { subjectName: 'Computer Science' },
  { subjectName: 'Geography' },
  { subjectName: 'History' },
  { subjectName: 'Physics' },
  { subjectName: 'Chemistry' },
  { subjectName: 'Biology' },
  { subjectName: 'Foreign Languages' },
  { subjectName: 'Literature' },
  { subjectName: 'Mathematical Literacy' },
  { subjectName: 'Economics' },
  { subjectName: 'Business Studies' },
  { subjectName: 'Information Technology' },
  { subjectName: 'Physical Sciences' },
  { subjectName: 'Life Sciences' },
  { subjectName: 'Religious Studies' },
  { subjectName: 'Home Economics' },
  { subjectName: 'Drama' },
  { subjectName: 'Design and Technology' },
  { subjectName: 'Citizenship Education' },
  { subjectName: 'Psychology' },
  { subjectName: 'Sociology' },
  { subjectName: 'Media Studies' },
  { subjectName: 'Health Education' },
];

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'subjects',
      subjects.map((subject) => ({
        ...subject,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
