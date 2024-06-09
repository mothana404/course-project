const {sequelize, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    user_id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_role: {
        type: DataTypes.STRING,
        defaultValue: 2,
    },
  });

    Users.belongsTo(sequelize.models.Role, {
        foreignKey: 'user_role',
        // defaultValue: 'student',
        onDelete: 'CASCADE',
    });

    Users.associate = (models) => {
        Users.hasMany(models.Courses, {
          foreignKey: 'course_teacher',
          as: 'courses',
          onDelete: 'CASCADE',
        });
      };

    return Users;
};