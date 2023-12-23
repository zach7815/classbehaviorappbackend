'use strict';

const subjectSkills = [
  {
    subject_id: 1,
    skill_id: 1,
  },
  {
    subject_id: 1,
    skill_id: 11,
  },
  {
    subject_id: 1,
    skill_id: 1,
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'subject_skills',
      subjectSkills.map((subjectSkill) => ({
        ...subjectSkill,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subject_skills', null, {});
  },
};
