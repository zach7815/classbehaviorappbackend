'use strict';

const teacherStudentClasses = [
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 1,
  },
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 2,
  },
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 3,
  },
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 4,
  },
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 5,
  },
  {
    teacher_id: 1,
    class_id: 1,
    role_id: 1,
    student_id: 6,
  },

  {
    teacher_id: 2,
    class_id: 2,
    role_id: 1,
    student_id: 1,
  },
  {
    teacher_id: 2,
    class_id: 2,
    role_id: 1,
    student_id: 2,
  },
  {
    teacher_id: 2,
    class_id: 2,
    role_id: 1,
    student_id: 3,
  },

  {
    teacher_id: 2,
    class_id: 2,
    role_id: 1,
    student_id: 4,
  },

  {
    teacher_id: 2,
    class_id: 2,
    role_id: 1,
    student_id: 5,
  },

  {
    teacher_id: 3,
    class_id: 3,
    role_id: 1,
    student_id: 1,
  },

  {
    teacher_id: 3,
    class_id: 3,
    role_id: 1,
    student_id: 2,
  },
];

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      'teacherStudentClasses',
      teacherStudentClasses.map((teacherStudentClass) => ({
        ...teacherStudentClass,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('teacherStudentClass', null, {});
  },
};
