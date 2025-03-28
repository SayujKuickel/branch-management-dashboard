const db = require("../models");
const sequelize = require("sequelize");

exports.getStats = async (req, res) => {
  try {
    const branches = await db.Branch.count();
    const students = await db.Student.count();

    const branch_stats = await db.Student.findAll({
      attributes: [
        "branch_id",
        [sequelize.fn("COUNT", sequelize.col("Student.id")), "student_count"],
        [sequelize.col("branch.name"), "branch_name"],
        [sequelize.col("branch.location"), "branch_location"],
      ],
      include: [
        {
          model: db.Branch,
          attributes: [],
        },
      ],
      group: ["branch_id"],
    });

    const unassigned = await db.Student.count({ where: { branch_id: null } });

    const branch_data = branch_stats.filter((item) => item.branch_id != null);

    const stats = {
      total_branches: branches,
      total_students: students,
      unassigned,
      branch_data,
    };

    res.status(200).json({
      status: "success",
      stats,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);

    res.status(500).json({
      status: "error",
      message: "Failed to retrieve statistics",
    });
  }
};
