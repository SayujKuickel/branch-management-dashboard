const { v4: uuidv4 } = require("uuid");
const db = require("../models");

// telephone

module.exports = (sequelize, DataTypes) => {
  const Branch = sequelize.define(
    "Branch",
    {
      id: {
        type: DataTypes.STRING(11),
        defaultValue: () => {
          id = uuidv4().replace(/-/g, "").substr(0, 8);
          const year = new Date().getFullYear().toString().slice(-3);

          return `sa001${id}${year}`;
        },
        primaryKey: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
      tableName: "Branches",
    }
  );

  Branch.associate = (models) => {
    Branch.hasMany(models.Student, { foreignKey: "branch_id" });
  };

  return Branch;
};
