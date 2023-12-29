'use strict';

const feedback = [
  {
    teacher_student_classes_id: 1,
    skill_id: 2,
    skills_value: 3,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
  },
  {
    teacher_student_classes_id: 1,
    skill_id: 13,
    skills_value: 5,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
  },
  {
    teacher_student_classes_id: 1,
    skill_id: 16,
    skills_value: 3,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
  },

  {
    teacher_student_classes_id: 7,
    skill_id: 1,
    skills_value: 3,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
  },

  {
    teacher_student_classes_id: 7,
    skill_id: 15,
    skills_value: 3,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
  },

  {
    teacher_student_classes_id: 7,
    skill_id: 19,
    skills_value: 3,
    feedback_comment: 'General Feedback',
    feedback_date: new Date(),
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
