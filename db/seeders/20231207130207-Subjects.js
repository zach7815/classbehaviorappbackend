'use strict';

const subjects = [
  { subject_name: 'Mathematics' },
  { subject_name: 'English Language' },
  { subject_name: 'Science' },
  { subject_name: 'Social Studies' },
  { subject_name: 'Physical Education' },
  { subject_name: 'Art' },
  { subject_name: 'Music' },
  { subject_name: 'Computer Science' },
  { subject_name: 'Geography' },
  { subject_name: 'History' },
  { subject_name: 'Physics' },
  { subject_name: 'Chemistry' },
  { subject_name: 'Biology' },
  { subject_name: 'Foreign Languages' },
  { subject_name: 'Literature' },
  { subject_name: 'Mathematical Literacy' },
  { subject_name: 'Economics' },
  { subject_name: 'Business Studies' },
  { subject_name: 'Information Technology' },
  { subject_name: 'Physical Sciences' },
  { subject_name: 'Life Sciences' },
  { subject_name: 'Religious Studies' },
  { subject_name: 'Home Economics' },
  { subject_name: 'Drama' },
  { subject_name: 'Design and Technology' },
  { subject_name: 'Citizenship Education' },
  { subject_name: 'Psychology' },
  { subject_name: 'Sociology' },
  { subject_name: 'Media Studies' },
  { subject_name: 'Health Education' },
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
