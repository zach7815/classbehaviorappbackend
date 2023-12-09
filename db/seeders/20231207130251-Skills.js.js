'use strict';

const skills = [
  { skillName: 'Problem Solving' },
  { skillName: 'Critical Thinking' },
  { skillName: 'Collaboration' },
  { skillName: 'Communication' },
  { skillName: 'Creativity' },
  { skillName: 'Organization' },
  { skillName: 'Time Management' },
  { skillName: 'Adaptability' },
  { skillName: 'Resilience' },
  { skillName: 'Leadership' },
  { skillName: 'Active Listening' },
  { skillName: 'Teamwork' },
  { skillName: 'Research' },
  { skillName: 'Presentation' },
  { skillName: 'Digital Literacy' },
  { skillName: 'Problem Solving' },
  { skillName: 'Analytical Thinking' },
  { skillName: 'Decision Making' },
  { skillName: 'Self-Motivation' },
  { skillName: 'Creativity' },
  { skillName: 'Attention to Detail' },
  { skillName: 'Organization' },
  { skillName: 'Time Management' },
  { skillName: 'Teamwork' },
  { skillName: 'Communication' },
  { skillName: 'Leadership' },
  { skillName: 'Critical Thinking' },
  { skillName: 'Adaptability' },
  { skillName: 'Problem Solving' },
  { skillName: 'Collaboration' },
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
