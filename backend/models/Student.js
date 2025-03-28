const { v4: uuidv4 } = require("uuid"); // Import UUIDv4
const db = require("../models");
const { ENUM } = require("sequelize");
// gender

module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define(
    "Student",
    {
      id: {
        type: DataTypes.STRING,
        defaultValue: () => {
          id = uuidv4().replace(/-/g, "").substr(0, 8);
          const year = new Date().getFullYear().toString().slice(-3);
          return `sa001${id}${year}`;
        },
        primaryKey: true,
        unique: true,
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
          isNumeric: true,
          len: [10, 15],
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: "Email is invalid",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        values: ENUM(["male", "female", "other"]),
        allowNull: true,
      },
      branch_id: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
          model: "Branches",
          key: "id",
        },
        onDelete: "SET NULL",
      },
    },
    {
      timestamps: false,
      tableName: "Students",
    }
  );

  Student.associate = (models) => {
    Student.belongsTo(models.Branch, { foreignKey: "branch_id" });
  };

  return Student;
};
