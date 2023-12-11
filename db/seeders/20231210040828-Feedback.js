'use strict';

const feedback = [
  {
    teacherStudentClasses_id: 1,
    skill_id: 2,
    skillsValue: 3,
  },
  {
    teacherStudentClasses_id: 1,
    skill_id: 13,
    skillsValue: 5,
  },
  {
    teacherStudentClasses_id: 1,
    skill_id: 16,
    skillsValue: 3,
  },

  {
    teacherStudentClasses_id: 7,
    skill_id: 1,
    skillsValue: 3,
  },

  {
    teacherStudentClasses_id: 7,
    skill_id: 15,
    skillsValue: 3,
  },

  {
    teacherStudentClasses_id: 7,
    skill_id: 19,
    skillsValue: 3,
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'feedback',
      feedback.map((feedbackValue) => ({
        ...feedbackValue,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('feedback', null, {});
  },
};
