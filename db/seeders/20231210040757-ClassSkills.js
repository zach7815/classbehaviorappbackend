'use strict';

const classSkills = [
  { skill_id: 13, class_id: 1 },
  { skill_id: 2, class_id: 1 },
  { skill_id: 3, class_id: 1 },
  { skill_id: 16, class_id: 1 },
  { skill_id: 1, class_id: 2 },
  { skill_id: 15, class_id: 2 },
  { skill_id: 18, class_id: 2 },
  { skill_id: 9, class_id: 2 },
  { skill_id: 1, class_id: 3 },
  { skill_id: 15, class_id: 3 },
  { skill_id: 18, class_id: 3 },
  { skill_id: 9, class_id: 3 },
  { skill_id: 2, class_id: 4 },
  { skill_id: 13, class_id: 4 },
  { skill_id: 16, class_id: 4 },
  { skill_id: 14, class_id: 4 },
  { skill_id: 12, class_id: 5 },
  { skill_id: 7, class_id: 5 },
  { skill_id: 10, class_id: 5 },
  { skill_id: 14, class_id: 5 },
  { skill_id: 5, class_id: 6 },
  { skill_id: 6, class_id: 6 },
  { skill_id: 18, class_id: 6 },
  { skill_id: 19, class_id: 6 },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'class_skills',
      classSkills.map((classSkill) => ({
        ...classSkill,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('class_skills', null, {});
  },
};
