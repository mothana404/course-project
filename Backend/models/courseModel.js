const {sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Courses = sequelize.define('Courses', {
    course_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    course_description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    course_image: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    course_teacher:{
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    course_category:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    is_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
  });

  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, {
      foreignKey: 'course_teacher',
      as: "teacher",
      onDelete: 'CASCADE',
    });
  };

    return Courses;
};