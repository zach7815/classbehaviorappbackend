'use strict';

const skills = [
  { skill_name: 'Problem Solving' },
  { skill_name: 'Critical Thinking' },
  { skill_name: 'Collaboration' },
  { skill_name: 'Communication' },
  { skill_name: 'Creativity' },
  { skill_name: 'Organization' },
  { skill_name: 'Time Management' },
  { skill_name: 'Adaptability' },
  { skill_name: 'Resilience' },
  { skill_name: 'Leadership' },
  { skill_name: 'Active Listening' },
  { skill_name: 'Teamwork' },
  { skill_name: 'Research' },
  { skill_name: 'Presentation' },
  { skill_name: 'Digital Literacy' },
  { skill_name: 'Analytical Thinking' },
  { skill_name: 'Decision Making' },
  { skill_name: 'Self-Motivation' },
  { skill_name: 'Attention to Detail' },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'skills',
      skills.map((skill) => ({
        ...skill,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('skills', null, {});
  },
};
